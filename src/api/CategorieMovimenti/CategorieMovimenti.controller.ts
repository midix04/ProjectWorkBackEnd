import { Request, Response, NextFunction } from "express";
import { omit, sample } from "lodash";
import CatSrv from "../CategorieMovimenti/CategorieMovimenti.service";

export const listmovimenti = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
      const cat = await CatSrv.getCategorieMovimenti()
    res.json(cat);
}