/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Classroom name.
 */
import express, { NextFunction, Request, Response } from 'express';
import classroomService from '../service/classroom.service';
import { UserInput } from '../types/index';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   post:
 *      summary: Add a classroom with a name. Returns a classroom object when succesful.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created classroom object
 *            content:
 *              application/json:
 */
classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classroomName = req.body;
        const response = await classroomService.createClassroom(classroomName);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

export { classroomRouter };