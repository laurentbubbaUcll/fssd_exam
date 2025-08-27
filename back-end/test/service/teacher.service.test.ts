import { Teacher } from "../../model/teacher";
import { User } from "../../model/user";
import teacherDb from "../../repository/teacher.db";
import teacherService from "../../service/teacher.service";
import { Role } from "../../types";

const validId: number = 1;
const validUsername: string = 'laurentAO';
const validFirstName: string = 'laurent';
const validLastName: string = 'bubba';
const validEmail: string = 'laurent.bubba@student.ucll.be';
const validPassword: string = 'coolguy';
const validRole: Role = 'student';
const user = new User({id: validId, username: validUsername, firstName: validFirstName, lastName: validLastName, email: validEmail, password: validPassword, role: validRole});
const learningPath1 = 'Software Development';
const learningPath2 = 'Infrastructure';
const teacher1 = {id: 1, user: user, learningPath: learningPath1};
const teacher2 = {id: 1, user: user, learningPath: learningPath2};

let mockTeacherDbGetAllTeachers: jest.Mock;
let mockTeacherDbUpdateLearningPath: jest.Mock;

beforeEach(() => {
    mockTeacherDbGetAllTeachers = jest.fn();
    mockTeacherDbUpdateLearningPath = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
})

// happy
test('given: teachers returned on db query, when: getting teachers, then: teachers are returned', async () => {
    // given
    const teachers = [teacher1, teacher2];
    teacherDb.getAllTeachers = mockTeacherDbGetAllTeachers.mockResolvedValue(teachers);

    //when
    const teachersReturned = await teacherService.getAllTeachers();

    //then
    expect(mockTeacherDbGetAllTeachers).toHaveBeenCalledTimes(1);
    expect(teachersReturned).toContain(teacher1);
    expect(teachersReturned).toContain(teacher2);
})

// unhappy: empty list
test('given: teachers returned on db query, when: getting teachers, then: teachers are returned', async () => {
    // given
    const teachers = [];
    teacherDb.getAllTeachers = mockTeacherDbGetAllTeachers.mockResolvedValue(teachers);

    //when
    const teachersReturned = await teacherService.getAllTeachers();

    //then
    expect(mockTeacherDbGetAllTeachers).toHaveBeenCalledTimes(1);
    expect(teachersReturned).toHaveLength(0);
})


// happy
test('given: a valid new learningpath, when: updating a teachers learningpath, then: the learningpath is updated', async () => {
    // given
    const learningPath = 'Infrastructure'
    teacherDb.updateLearningPath = mockTeacherDbUpdateLearningPath.mockResolvedValue(teacher2);

    //when
    const teacherReturned = await teacherService.updateLearningPath(teacher1.id, learningPath);

    //then
    expect(mockTeacherDbUpdateLearningPath).toHaveBeenCalledTimes(1);
    expect(teacherReturned.learningPath).toEqual(learningPath);
})