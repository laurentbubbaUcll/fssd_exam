import { Teacher } from "@types";

const getAllTeachers = async (): Promise<Teacher[]> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/teachers", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  })

  const data: Teacher[] = await response.json();
  return data;
};

const updateLearningPath = async (teacherId: number, learningPath: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/teachers/${teacherId}/learningpath?learningPath=${learningPath}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
  })

  const data: Teacher[] = await response.json();
  return data;
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
