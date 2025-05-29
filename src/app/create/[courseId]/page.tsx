import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import ConfirmChapters from "@/components/ConfirmChapters";

interface Props {
  params: {
    courseId: string;
  };
}

const CreateChapters = async ({ params }: Props) => {
  const courseId = params.courseId;

  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/auth");
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/create");
  }

  return (
    <div className="flex flex-col items-start max-w-7xl mx-auto my-16 px-4">
      <h1 className="text-2xl font-bold mb-4">
        Course Creation - {course.name}
      </h1>
      <ConfirmChapters course={course} />
    </div>
  );
};

export default CreateChapters;