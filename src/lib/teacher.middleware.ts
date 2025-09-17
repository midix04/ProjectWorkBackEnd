import { Request, Response, NextFunction } from "express";
import {User} from "../api/user/user.entity";
import { assigmentModel } from "../api/classroom/assigments/assigments.model";


export function isTeacher(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): void {
    if ((req.user as User).role !== 'teacher') {
       res.status(404).json({ message: 'Accesso negato: non sei un insegnante' });
       return
    }
    
    next();
  }