import { Request, Response, NextFunction } from "express";

export class ClassRoomNotFoundError extends Error {
    constructor() {
        super('This classroom is not right');
    }
}

export const ClassRoomNotFoundErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ClassRoomNotFoundError) {
        res.status(404).json({
            error: 'ClassRoomNotFound',
            message: 'This classroom does not exist'
        });
    } else {
        next(err);
    }
};