import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  // if the user input is in a list, we also process the output as a list of json
  const list_input: boolean = Array.isArray(user_prompt);
  // if the output format contains dynamic elements of < or >, then add to the prompt to handle dynamic elements
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  // if the output format contains list elements of [ or ], then we add to the prompt to handle lists
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  // start off with no error message
  let error_msg: string = "";

  const model = ai.models.generateContent;

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output ${
      list_output && "an array of objects in"
    } the following in json format: ${JSON.stringify(
      output_format
    )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    // if output_format contains dynamic elements, process it accordingly
    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

    // if input is in a list format, ask it to generate json in a list
    if (list_input) {
      output_format_prompt += `\nGenerate an array of json, one json for each input element.`;
    }

    try {
      // Use Gemini to get a response
      const prompt = system_prompt + output_format_prompt + error_msg + "\n" + user_prompt.toString();
      const result = await model({
        model: "gemini-2.0-flash-001",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: temperature,
          topK: 40,
          topP: 0.95,
        },
      });
      
      if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("No valid response from model");
      }

      let res: string = result.candidates[0].content.parts[0].text.replace(/'/g, '"');

      // Remove markdown code block formatting if present
      res = res.replace(/```json\n?|\n?```/g, '').trim();

      // ensure that we don't replace away apostrophes in text
      res = res.replace(/(\w)"(\w)/g, "$1'$2");

      if (verbose) {
        console.log("System prompt:", system_prompt + output_format_prompt + error_msg);
        console.log("\nUser prompt:", user_prompt);
        console.log("\nGemini response:", res);
      }

      // try-catch block to ensure output format is adhered to
      try {
        let output: any;
        try {
          output = JSON.parse(res);
        } catch (e) {
          // Attempt to fix unescaped inner quotes in values
          let fixed = res.replace(/: ?"((?:[^"\\]|\\.)*)"/g, (match, value) => {
            // Escape inner quotes
            return ': "' + value.replace(/"/g, '\\"') + '"';
          });
          try {
            output = JSON.parse(fixed);
          } catch (e2) {
            // As a last resort, extract all JSON objects/arrays
            const matches = fixed.match(/(\{[\s\S]*?\}|\[[\s\S]*?\])/g);
            if (matches) {
              output = matches.map((m) => {
                try {
                  return JSON.parse(m);
                } catch {
                  return null;
                }
              }).filter(Boolean);
              if (output.length === 1) output = output[0];
            } else {
              throw new Error("No valid JSON found in response");
            }
          }
        }

        // Log the output for debugging
        console.log("strict_output parsed output:", output);

        // Defensive: If output is a single object, wrap it in an array
        if (!Array.isArray(output)) {
          output = [output];
        }

        // Defensive: If output is an array of arrays, flatten it
        if (Array.isArray(output) && Array.isArray(output[0])) {
          output = output.flat();
        }

        if (list_input && !Array.isArray(output)) {
          throw new Error("Output format not in an array of json");
        }

        // check for each element in the output_list, the format is correctly adhered to
        for (let index = 0; index < output.length; index++) {
          for (const key in output_format) {
            // unable to ensure accuracy of dynamic output header, so skip it
            if (/<.*?>/.test(key)) {
              continue;
            }

            // if output field missing, raise an error
            if (!(key in output[index])) {
              throw new Error(`${key} not in json output`);
            }

            // check that one of the choices given for the list of words is an unknown
            if (Array.isArray(output_format[key])) {
              const choices = output_format[key] as string[];
              // ensure output is not a list
              if (Array.isArray(output[index][key])) {
                output[index][key] = output[index][key][0];
              }
              // output the default category (if any) if Gemini is unable to identify the category
              if (!choices.includes(output[index][key]) && default_category) {
                output[index][key] = default_category;
              }
              // if the output is a description format, get only the label
              if (output[index][key].includes(":")) {
                output[index][key] = output[index][key].split(":")[0];
              }
            }
          }

          // if we just want the values for the outputs
          if (output_value_only) {
            output[index] = Object.values(output[index]);
            // just output without the list if there is only one element
            if (output[index].length === 1) {
              output[index] = output[index][0];
            }
          }
        }

        return list_input ? output : output[0];
      } catch (e) {
        error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
        console.log("An exception occurred:", e);
        console.log("Current invalid json format ", res);
      }
    } catch (e) {
      error_msg = `\n\nError generating content: ${e}`;
      console.log("An exception occurred while generating content:", e);
    }
  }

  return [];
}