import { Request, Response, NextFunction } from "express";

export class userNotProf extends Error {
    constructor() {
        super('The user is not a Prof');
    }
}

export const userNotProfHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof userNotProf) {
        res.status(404).json({
            error: 'userNotProf',
            message: 'The user is not a Prof'
        });
    } else {
        next(err);
    }
};