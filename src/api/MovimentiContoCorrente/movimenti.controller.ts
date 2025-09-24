//c  h 3g
import { Request, Response, NextFunction } from "express";
import { MovimentiDto } from "./movimenti.dto";
import { TypedRequest } from "../../lib/typed-request.interface";
import MovSrv from "../MovimentiContoCorrente/movimenti.services"
import { omit, pick } from "lodash";
import { ContoCorrente } from "../ContoCorrente/user.entity";
import movimentiServices from "../MovimentiContoCorrente/movimenti.services";
import { MovimentiEntity } from "./movimenti.entity";
import ExcelJS from "exceljs";
import { parse as json2csv } from "json2csv";

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
        // IN CASO sia un bonifico in uscita
        const iban = (req.body.ibanDestinatario)
        let destinarioEmail 
        if(req.body.categoriaMovimento == "3"){
        if(iban){
          const iban = (req.body.ibanDestinatario)
          destinarioEmail = await MovSrv.findUser(iban!)
        }
      }

        const newMov = await MovSrv.addMovimento(movObj, movEmail);

        if((newMov.categoriaMovimento as any).CategoriaMovimentoID == 3 && newMov){
          if(iban){
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

    const movimentiFiltrati = movimenti.filter(mov => 
          (mov.categoriaMovimento as any).CategoriaMovimentoID === categoriaMovimento
        )


    res.json({
      movimenti: movimentiFiltrati,
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


export const exp2 = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contoCorrenteID = (req.user as any)?.id;
    const n = parseInt(req.query.n as string) || 5;
    const formato = req.query.formato as string; // 'csv' o 'xlsx'
    const categoria = req.query.categoria as string; // esempio: 'Stipendio'

    // Prendo gli ultimi n movimenti, eventualmente filtrati per categoria
    const { movimenti} = await MovSrv.getLastNMovimenti(
      contoCorrenteID!.toString(),
      n
    );

    // Esportazione CSV
    if (formato === 'csv') {
      const csv = json2csv(movimenti, {
        keys: ['data', 'importo', 'saldo', 'CategoriaMovimento', 'descrizioneEstesa'],
      });
      res.header('Content-Type', 'text/csv');
      res.attachment('movimenti.csv');
      res.send(csv);
      return;
    }

    // Esportazione Excel
    if (formato === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Movimenti');

      sheet.columns = [
        { header: 'Data', key: 'data' },
        { header: 'Importo', key: 'importo' },
        { header: 'Saldo', key: 'saldo' },
        { header: 'Categoria', key: 'CategoriaMovimento' },
        { header: 'Descrizione', key: 'descrizioneEstesa' },
      ];

      movimenti.forEach((movimento) => sheet.addRow(movimento));

      res.header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.attachment('movimenti.xlsx');
      await workbook.xlsx.write(res);
      res.end();
      return;
    }

    // Risposta JSON di default
    res.json({ movimenti});
  } catch (err) {
    next(err);
  }
};

export const exp1 = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contoCorrenteID = (req.user as any)?.id;
    const n = parseInt(req.query.n as string) || 5; // default 5 movimenti
    const formato = req.query.formato as string; // 'csv' o 'xlsx'

    // Chiamata al service per prendere gli ultimi n movimenti
    const { movimenti} = await movimentiServices.getLastNMovimenti(
      contoCorrenteID!.toString(),
      n
    );

    // Esportazione in CSV
    if (formato === 'csv') {
      const csv = json2csv(movimenti, {
        keys: ['data', 'importo', 'CategoriaMovimento', 'descrizioneEstesa']
      });
      res.header('Content-Type', 'text/csv');
      res.attachment('movimenti.csv');
      res.send(csv);
      return;
    }

    // Esportazione in Excel
    if (formato === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Movimenti');

      sheet.columns = [
        { header: 'Data', key: 'data' },
        { header: 'Importo', key: 'importo' },
        { header: 'Categoria', key: 'CategoriaMovimento' },
        { header: 'Descrizione', key: 'descrizioneEstesa' },
      ];

      movimenti.forEach((movimento) => sheet.addRow(movimento));

      res.header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.attachment('movimenti.xlsx');
      await workbook.xlsx.write(res);
      res.end();
      return;
    }

    // Risposta JSON di default
    res.json({
      movimenti
    });
  } catch (err) {
    next(err);
  }
};



export const exp3 = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contoCorrenteID = (req.user as any)?.id;
    const n = parseInt(req.query.n as string) || 5;
    const formato = req.query.formato as string; 
    const dataInizio = req.query.dataInizio as string;
    const dataFine = req.query.dataFine as string;

    if (!dataInizio || !dataFine) {
      res.status(400).json({ error: 'Devi fornire dataInizio e dataFine' });
      return;
    }

   
    const movimenti = await MovSrv.getMovimentiBetweenDates(
      contoCorrenteID!.toString(),
      new Date(dataInizio),
      new Date(dataFine),
      n
    );

    
    if (formato === 'csv') {
      const csv = json2csv(movimenti, {
        keys: ['data','categoriaMovimento'],
      });
      res.header('Content-Type', 'text/csv');
      res.attachment('movimenti.csv');
      res.send(csv);
      return;
    }

  
    if (formato === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Movimenti');

      sheet.columns = [
        { header: 'Data', key: 'data' },
        { header: 'Categoria', key: 'categoriaMovimento' },
      ];

      movimenti.forEach((movimento) => sheet.addRow(movimento));

      res.header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.attachment('movimenti.xlsx');
      await workbook.xlsx.write(res);
      res.end();
      return;
    }

   
    res.json({ movimenti });
  } catch (err) {
    next(err);
  }
};




