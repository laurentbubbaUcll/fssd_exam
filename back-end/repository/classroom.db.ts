import { Classroom } from '../model/classroom';
import { User } from '../model/user';
import database from '../util/database';

const getClassroomByName = async ({ name }: { name: string }): Promise<Classroom | null> => {
    try {
        const classroomPrisma = await database.classroom.findFirst({
            where: { name },
        });
        return classroomPrisma ? Classroom.from(classroomPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const createClassroom = async ({
    name,
}: Classroom): Promise<Classroom> => {
    try {
        const classroomPrisma = await database.classroom.create({
            data: { name },
        });
        return Classroom.from(classroomPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getClassroomByName,
    createClassroom,
};
