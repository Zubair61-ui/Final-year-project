import { Chapter, Unit } from "@prisma/client";
import React from "react";

// Add this import if using Next.js font optimization, otherwise ensure Lexend is loaded globally
// import { Lexend } from "next/font/google";
// const lexend = Lexend({ subsets: ["latin"] });

type Props = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

const MainVideoSummary = ({
  unit,
  unitIndex,
  chapter,
  chapterIndex,
}: Props) => {
  return (
    <div className="flex-[2] mt-16 font-lexend">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{chapter.name}</h1>
      <iframe
        title="chapter video"
        className="w-full mt-4 aspeect-video max-h-[25rem]"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Summary</h3>
        <p className="mt-2 text-secondary-foreground/80">{chapter.summary}</p>
      </div>
    </div>
  );
};

export default MainVideoSummary;