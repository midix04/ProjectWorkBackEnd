import { Request, Response, NextFunction } from "express";

export class wrongClassroomError extends Error {
    constructor() {
        super('This classroom is not right');
    }
}


export const wrongClassroomErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof wrongClassroomError) {
        res.status(404).json({
            error: 'WrongClassRoomError',
            message: 'This prof does not belong to this classroom'
        });
    } else {
        next(err);
    }

};