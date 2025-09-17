import { Request, Response, NextFunction } from "express";
import {User} from "../api/user/user.entity";


export function isStudent(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): void {
    if ((req.user as User).role !== 'student') {
       res.status(404).json({ message: 'Accesso negato: non sei uno studente' });
       return
    }
    next();
  }