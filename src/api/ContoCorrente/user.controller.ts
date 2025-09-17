import { Request, Response, NextFunction } from "express";
import userSrv, { UserExistsError } from "./user.service";

export const me = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    
    res.json(req.user);
}


