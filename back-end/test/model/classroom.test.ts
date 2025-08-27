import { Classroom } from "../../model/classroom";

// happy
test('given: valid name for classroom, when: classroom is created, then: classroom is created with right name', () => {
    // given
    const name = 'B206';
    
    //when
    const classroom = new Classroom({name: name});

    //then
    expect(classroom.name).toEqual(name);
})

// unhappy: empty name
test('given: empty name for classroom, when: classroom is created, then: an error is thrown', () => {
    // given
    const name = '';
    
    //when
    const classroom = () => new Classroom({name: name});

    //then
    expect(classroom).toThrowError('Name is required');
})