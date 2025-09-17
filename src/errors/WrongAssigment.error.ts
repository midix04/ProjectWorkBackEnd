import { Request, Response, NextFunction } from "express";

export class WrongAssigmentError extends Error {
    constructor() {
        super('This assigment does not belong to this class or does not exist');
    }
}

export const WrongAssigmentErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof WrongAssigmentError) {
        res.status(404).json({
            error: 'AssigmentNotFound',
            message: 'This assigment does not belong to this class or does not exist'
        });
    } else {
        next(err);
    }
};