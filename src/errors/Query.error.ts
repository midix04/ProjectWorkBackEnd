import { Request, Response, NextFunction } from "express";

export class QueryNotRightError extends Error {
    constructor() {
        super('The query params is not right');
    }
}

export const queryNotRightHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof QueryNotRightError) {
        res.status(400).json({
            error: 'QueryNotRightError',
            message: 'The query param is not right'
        });
    } else {
        next(err);
    }
};