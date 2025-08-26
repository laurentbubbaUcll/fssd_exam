import { Teacher } from "../../model/teacher";
import teacherDb from "../../repository/teacher.db";

let mockTeacherDbGetAllTeachers;
let mockTeacherDbUpdateLearningPath: jest.SpyInstance<Promise<Teacher>, [teacherId: number, learningPath: string], any>;

beforeEach(() => {
    mockTeacherDbGetAllTeachers = jest.spyOn(teacherDb,'getAllTeachers');
    mockTeacherDbUpdateLearningPath = jest.spyOn(teacherDb,'updateLearningPath');
});

afterEach(() => {
    jest.clearAllMocks();
})