import { Request, Response, NextFunction } from "express";
import userSrv, { UserExistsError } from "./user.service";
import { ContoCorrente } from "./user.entity";
import { omit, sample } from "lodash";
import MovSrv from "../MovimentiContoCorrente/movimenti.services"

export const me = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
      console.log((req.user as any).id)
      const saldo = await MovSrv.getLastSaldo((req.user as any).id)
      console.log(saldo)
      const obj = omit(req.user as ContoCorrente, 'id')
      const resObj = {
        ...obj,
        saldo: saldo
      }
    res.json(resObj);
}


