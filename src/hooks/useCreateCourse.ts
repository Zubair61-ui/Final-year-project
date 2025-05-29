import { useUser } from "@/lib/store/user";
import { useRouter } from "next/navigation";

export const useCreateCourse = () => {
  const { isAuth } = useUser();
  const router = useRouter();

  const handleCreateCourse = () => {
    if (isAuth) {
      router.push("/course/create");
    } else {
      router.push("/course/gallery");
    }
  };

  return handleCreateCourse;
};