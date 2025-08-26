import { Classroom } from "@types";

const addClassroom = async (name: string) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/classrooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    })

    return response;
};

const ClassroomService = {
  addClassroom,
};

export default ClassroomService;