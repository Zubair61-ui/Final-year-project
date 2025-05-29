import { z } from "zod";

export const createChaptersSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  units: z.array(
    z.string().min(1, {
      message: "Unit is required",
    })
  ),
});