//c  h 3g
import { Request, Response, NextFunction } from "express";
import { MovimentiDto } from "./movimenti.dto";
import { TypedRequest } from "../../lib/typed-request.interface";
import MovSrv from "../MovimentiContoCorrente/movimenti.services"
import { omit, pick } from "lodash";
import { ContoCorrente } from "../ContoCorrente/user.entity";

export const AddMov = async (
    req: TypedRequest<MovimentiDto>,
    res: Response, 
    next: NextFunction) => {

    const mov = omit(req.body, 'email')
    const movEmail = req.body.email
    const date = new Date()
    const movObj = {
        ...mov,
        data: date
    }
    const newMov = await MovSrv.addMovimento(movObj, movEmail)

    res.json(newMov);
}



export const MovLast5List = async ( //5 movimenti in ordine decrescente di data
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const contoCorrenteID = (req.user as any)?.id;
    const n = parseInt(req.query.n as string) || 5;
    const { movimenti, saldoFinale } = await MovSrv.getLastNMovimenti(contoCorrenteID!.toString(), n);

    res.json({
      movimenti,
      saldoFinale,
    });
  } catch (err) {
    next(err);
  }
};

export const MovCatList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contoCorrente = (req.user as any).id;
    const n = parseInt(req.query.n as string) || 5;
    const categoriaMovimento = req.query.categoria as string | undefined; 

    const { movimenti} = await MovSrv.getLastNMovimenti2(
      contoCorrente!.toString(),
      n,
      categoriaMovimento
    );

    res.json({
      movimenti,
      
    });
  } catch (err) {
    next(err);
  }
};

export const MovBtwDatesList = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    
    res.json(req.user);
}

