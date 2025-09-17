import { Request, Response, NextFunction } from "express";
import userSrv, { UserExistsError } from "../user/user.service";

export const me = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    
    res.json(req.user);
}


export const list = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
        try{
            const ruolo = req.query.type as string;
            const users = await fetch(ruolo)
            res.json(users)
            
        }catch(err){
            next(err)
        }

}