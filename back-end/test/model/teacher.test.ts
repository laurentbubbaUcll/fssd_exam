import { Teacher } from "../../model/teacher";
import { User } from "../../model/user";
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
const teacher1 = {user: user, learningPath: learningPath1};


// happy
test('given: valid parameters for teacher, when: teacher is created, then: teacher is created with correctly', () => {
    // given
    // already in earlier variables
    
    //when
    const teacher = new Teacher({user: user, learningPath: learningPath1});

    //then
    expect(teacher.user).toEqual(user);
    expect(teacher.learningPath).toEqual(learningPath1);

})

// unhappy: empty learning path
test('given: empty learning path, when: teacher is created, then: an error is thrown', () => {
    // given
    const invalidLearningPath = '';
    
    //when
    const teacher = () => new Teacher({user: user, learningPath: invalidLearningPath});

    //then
    expect(teacher).toThrowError('Learning path is required');
})

// unhappy: empty user
test('given: empty user, when: teacher is created, then: an error is thrown', () => {
    // given
    const userEmpty = null;
    
    //when
    const teacher = () => new Teacher({user: userEmpty, learningPath: learningPath1});

    //then
    expect(teacher).toThrowError('User is required');
})