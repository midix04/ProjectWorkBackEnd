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
    next: NextFunction
) => {
    try {
        const mov = omit(req.body, 'email');
        const movEmail = (req.user as any).email
        const date = new Date();
        const saldo = await MovSrv.getLastSaldo((req.user as any).id);
        const movObj = {
            ...mov,
            data: date,
            saldo: saldo,
            ContoCorrente: (req.user as any).id
        };
        const newMov = await MovSrv.addMovimento(movObj, movEmail);
        console.log("AAAAAAAAAAAAAAAAAAAAAA", (newMov.categoriaMovimento as any).CategoriaMovimentoID)
        if((newMov.categoriaMovimento as any).CategoriaMovimentoID == 3 && newMov){
          const iban = (req.body.ibanDestinatario)
          console.log(iban)
          if(iban){
          const destinarioEmail = await MovSrv.findUser(iban)
          if(destinarioEmail){
         const saldiBen = await MovSrv.getLastSaldo(destinarioEmail.id);
          const movObj=  {
            "importo": req.body.importo,
            "data": date,
            "saldo": saldiBen,
            "categoriaMovimento": "2",
             "descrizioneEstesa": "Bonifico in entrata",
            "ContoCorrente": destinarioEmail._id
        }
        console.log("SDFDGOJFdgkesokigjofisgjrfgru")
         await MovSrv.addMovimento(movObj, destinarioEmail.email);
        }
          }
        }
        res.status(201).json(newMov);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};



export const MovLast5List = async ( //5 movimenti in ordine decrescente di data
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const contoCorrenteID = (req.user as any)?.id;
    const n = parseInt(req.query.n as string) || 5;
    const { movimenti } = await MovSrv.getLastNMovimenti(contoCorrenteID!.toString(), n);
    const saldo = await MovSrv.getLastSaldo((req.user as any).id);

    res.json({
      movimenti,
      saldo,
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

    const { movimenti } = await MovSrv.getLastNMovimenti(contoCorrente!.toString(), n);
    const saldo = await MovSrv.getLastSaldo((req.user as any).id);

    const movimentiFiltrati = movimenti.filter(mov => 
          (mov.categoriaMovimento as any).CategoriaMovimentoID === categoriaMovimento
        )


    res.json({
      movimenti: movimentiFiltrati,
      saldoFinale: saldo
    });
  } catch (err) {
    next(err);
  }
};

export const MovBtwDatesList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contoCorrente = (req.user as any).id;
    const n = parseInt(req.query.n as string) || 5;

    const startDate = new Date(req.query.startDate as string);
    const endDate = new Date(req.query.endDate as string);

    const movimenti = await MovSrv.getMovimentiBetweenDates(
      contoCorrente!.toString(),
      startDate,
      endDate,
      n
    );

    res.json(movimenti);
  } catch (err) {
    next(err);
  }
};

