//c  h 3g
import { Request, Response, NextFunction } from "express";

export const MovLast5List = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    
    res.json(req.user);
}

export const MonNList = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    
    res.json(req.user);
}
export const MovCatList = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    
    res.json(req.user);
}
export const MovBtwDatesList = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    
    res.json(req.user);
}

