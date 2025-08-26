import bcrypt from 'bcrypt';
import { User } from "../../model/user";
import userDb from "../../repository/user.db";
import userService from "../../service/user.service";
import { UserInput } from '../../types';
import { Role } from "../../types";

const validId: number = 1;
const validUsername: string = 'laurentAO';
const validFirstName: string = 'laurent';
const validLastName: string = 'bubba';
const validEmail: string = 'laurent.bubba@student.ucll.be';
const validPassword: string = 'coolguy';
const validRole: Role = 'student';
let mockUserDbGetAllUsers;
let mockUserDbGetUserById: jest.SpyInstance<Promise<User>, [{ id: number; }], any>;
let mockUserDbGetUserByUsername: jest.SpyInstance<Promise<User>, [{ username: string; }], any>;
let mockUserDbCreateUser: jest.SpyInstance<Promise<User>, [User], any>;
let mockBCryptHash;


beforeEach(() => {
    mockUserDbGetAllUsers = jest.spyOn(userDb,'getAllUsers');
    mockUserDbGetUserById = jest.spyOn(userDb,'getUserById');
    mockUserDbGetUserByUsername = jest.spyOn(userDb,'getUserByUsername');
    mockBCryptHash = jest.spyOn(bcrypt,'hash');
    mockUserDbCreateUser = jest.spyOn(userDb,'createUser');
});

afterEach(() => {
    jest.clearAllMocks();
})

test('given: valid user object; when: user is created with these values in the service; then: user is succesfully created', async () => {
    // given
    const userInput: UserInput = {
    username: validUsername,
    password: validPassword,
    firstName: validFirstName,
    lastName: validLastName,
    email: validEmail,
    role: validRole,
    };
    
    mockUserDbGetUserByUsername.mockReturnValue(null);
    mockBCryptHash.mockReturnValue(validPassword);
    const userToBeReturned = new User({id: validId, username: validUsername, firstName: validFirstName, lastName: validLastName, email: validEmail, password: validPassword, role: validRole});
    mockUserDbCreateUser.mockReturnValue(Promise.resolve(userToBeReturned));

    //when
    await userService.createUser(userInput);

    // then
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({username: validUsername});
    expect(mockBCryptHash).toHaveBeenCalledTimes(1);
    expect(mockBCryptHash).toHaveBeenCalledWith(validPassword, expect.any(Number));
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(expect.any(User));
})