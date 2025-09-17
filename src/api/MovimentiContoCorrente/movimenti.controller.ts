//c  h 3g
import { Request, Response, NextFunction } from "express";
import { MovimentiDto } from "./movimenti.dto";
import { TypedRequest } from "../../lib/typed-request.interface";
import MovSrv from "../MovimentiContoCorrente/movimenti.services"
import { omit, pick } from "lodash";

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
    const newMov = await MovSrv.addContoCorrente(movObj, movEmail)

    res.json(newMov);
}


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

