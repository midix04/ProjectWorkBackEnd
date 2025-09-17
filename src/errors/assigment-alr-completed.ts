import { Request, Response, NextFunction } from "express";

export class AssigmentAlrCompleted extends Error {
    constructor() {
        super('This assigment was already completed');
    }
}

export const AssigmentAlrCompletedHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AssigmentAlrCompleted) {
        res.status(400).json({
            error: 'AssigmentAlrCompleted',
            message: 'This assigment was already completed'
        });
    } else {
        next(err);
    }
};