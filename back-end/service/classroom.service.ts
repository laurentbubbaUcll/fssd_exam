import bcrypt from 'bcrypt';
import { User } from '../model/user';
import classroomDB from '../repository/classroom.db';
import { ClassroomInput } from '../types';
import { Classroom } from '../model/classroom';

const createClassroom = async ({
    name,
}: ClassroomInput): Promise<Classroom> => {
    const existingClassroom = await classroomDB.getClassroomByName({ name });

    if (existingClassroom) {
        throw new Error(`Classroom already exists`);
    }

    const classroom = new Classroom({ name });

    return await classroomDB.createClassroom(classroom);
};

export default {
    createClassroom,
};
