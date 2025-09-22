import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddUserDTO } from "./auth.dto";
import userSrv, { UserExistsError } from "../ContoCorrente/user.service";
import { omit, pick, random } from "lodash";
import passport, { use } from "passport";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../lib/auth/jwt/jwt-strategy";
import { IBAN } from "ibankit";
import MovSrv from "../MovimentiContoCorrente/movimenti.services"
import { sendRegistrationEmail } from "./email.service";
import bcrypt from "bcrypt";


export const register = async (
    req: TypedRequest<AddUserDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData = omit(req.body, 'password');
        const credentialsData = pick(req.body, 'email', 'password');
        const iban = IBAN.random();
        const date = new Date()
        const userDataObj = {
            ...userData,
            dataApertura: date,
            IBAN: iban.toString()
        }
        const newUser = await userSrv.addContoCorrente(userDataObj, credentialsData);
        
       const movObj=  {
            "importo": 0,
            "data": date,
            "saldo": 0,
            "categoriaMovimento": "4",
             "descrizioneEstesa": "Primo movimento per l'apertura del conto",
            "ContoCorrente": (newUser as any).id,
        }

        const newMov = await MovSrv.addMovimento(movObj,  (newUser as any).email)
        //await sendRegistrationEmail((newUser as any).email, (newUser as any).nomeTitolare);

        res.status(201).json(newUser);
    } catch(err) {
        if (err instanceof UserExistsError) {
            res.status(400);
            res.json({
                error: err.name,
                message: err.message
            })
        } else {
            next(err);
        }
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    passport.authenticate('local', { session: false },
        (err, user, info) => {
            if(err) {
                next(err);
                return;
            }

            if (!user) {
                res.status(400);
                res.json({
                    error: 'LoginError',
                    message: info?.message || 'Credenziali non valide'
                });
                return;
            }
            const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7 days' });

            
            res.status(200);
            res.json({
                user,
                token
            });
        }
    )(req, res, next);
}


interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = async (
  req: TypedRequest<ChangePasswordDTO>,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  try {
    const user = req.user as any; // utente estratto da JWT tramite passport-jwt
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        error: "ValidationError",
        message: "Vecchia e nuova password sono obbligatorie",
      });
    }

    // Recupera le credenziali dal DB
    const existingUser = await userSrv.findById(user.id);
    if (!existingUser) {
      return res.status(404).json({
        error: "UserNotFound",
        message: "Utente non trovato",
      });
    }

    // Verifica vecchia password
    const isMatch = await bcrypt.compare(oldPassword, existingUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        error: "WrongPassword",
        message: "La vecchia password non è corretta",
      });
    }

    // Hash nuova password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Aggiorna nel DB
    await userSrv.updatePassword(user.id, newHashedPassword);

    res.status(200).json({
      message: "Password aggiornata con successo",
    });
  } catch (err) {
    next(err);
  }
};