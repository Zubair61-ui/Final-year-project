// /api/course/createChapters

import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gemini.server";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("unauthorised", { status: 401 });
    }

    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);

    // Generate exactly 2 chapters for each unit
    let output_units = await Promise.all(
      units.map(async (unit) => {
        return await strict_output(
          "You are an AI capable of curating course content and creating chapter titles",
          `Create exactly 2 chapters for a unit about ${unit}. The chapters should progress from basic to advanced concepts.`,
          {
            title: unit, // Use the unit name provided by user
            chapters: "an array of exactly 2 chapters, each chapter should have a youtube_search_query and a chapter_title key",
          }
        );
      })
    );

    const course_image = await getUnsplashImage(title);
    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image,
      },
    });

    // Create units and their chapters
    for (const unit of output_units) {
      const prismaUnit = await prisma.unit.create({
        data: {
          name: unit.title,
          courseId: course.id,
        },
      });

      // Ensure exactly 2 chapters per unit
      const chaptersToCreate = unit.chapters.slice(0, 2);
      await prisma.chapter.createMany({
        data: chaptersToCreate.map((chapter: { chapter_title: string; youtube_search_query: string }) => ({
          name: chapter.chapter_title,
          youtubeSearchQuery: chapter.youtube_search_query,
          unitId: prismaUnit.id,
        })),
      });
    }

    return NextResponse.json({
      course_id: course.id,
      status: 'success'
    });

  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid body", { status: 400 });
    }
    return new NextResponse("internal server error", { status: 500 });
  }
}