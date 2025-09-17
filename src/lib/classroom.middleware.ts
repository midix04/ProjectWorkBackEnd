import { Request, Response, NextFunction } from "express";
import { User } from "../api/user/user.entity";

export async function isInClass(
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  try {
    const classId = req.params.classId;
    const userId = (req.user as User).id;
    const classroomExit = await classModel.find({_id:classId})
    if(classroomExit.length==0){
      res.status(404).json({ message: 'Non esiste questa classe' });
    }
    const classroomFound = await classModel.find({
      $or: [
        { students: userId, _id: classId }, 
        { createdBy: userId, _id: classId }
          ]});
    if (classroomFound.length==0) {
      res.status(404).json({ message: 'Non fai parte di questa classe' });
      return;
    }
    
    next();
  } catch (error) {
    next(error)
  }
}
