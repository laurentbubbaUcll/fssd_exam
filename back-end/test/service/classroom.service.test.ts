import { Classroom } from "../../model/classroom";
import classroomDb from "../../repository/classroom.db";
import classroomService from "../../service/classroom.service";

let mockClassroomGetClassroomByName: jest.Mock;
let mockClassroomCreateClassroom: jest.Mock;

beforeEach(() => {
    mockClassroomGetClassroomByName = jest.fn();
    mockClassroomCreateClassroom = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
})

// happy
test('given: a valid name, when: creating a new classroom, then: the classroom is correctly made', async () => {
    // given
    const name = 'B206'
    classroomDb.getClassroomByName = mockClassroomGetClassroomByName.mockResolvedValue(null);
    classroomDb.createClassroom = mockClassroomCreateClassroom;

    //when
    await classroomService.createClassroom({name});

    //then
    expect(mockClassroomGetClassroomByName).toHaveBeenCalledTimes(1);
    expect(mockClassroomGetClassroomByName).toHaveBeenCalledWith({name: name});
    expect(mockClassroomCreateClassroom).toHaveBeenCalledTimes(1);
})

// unhappy: classroom already exists
test('given: a classroom that already exists, when: creating a new classroom with the same name, then: an error is thrown', async () => {
    // given
    const name = 'B206'
    const alreadyExistingClassroom = new Classroom({name});
    classroomDb.getClassroomByName = mockClassroomGetClassroomByName.mockResolvedValue(alreadyExistingClassroom);

    //when
    const classroom = async () => classroomService.createClassroom({name});

    //then
    expect(classroom).rejects.toThrowError('Classroom already exists');    
})