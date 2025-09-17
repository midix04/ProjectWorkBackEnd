import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddUserDTO } from "./auth.dto";
import userSrv, { UserExistsError } from "../ContoCorrente/user.service";
import { omit, pick, random } from "lodash";
import passport, { use } from "passport";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../lib/auth/jwt/jwt-strategy";
import { IBAN } from "ibankit";

export const register = async (
    req: TypedRequest<AddUserDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData = omit(req.body, 'password');
        const credentialsData = pick(req.body, 'Email', 'password');
        const iban = IBAN.random();
        const date = new Date()
        const userDataObj = {
            ...userData,
            dataApertuta: date,
            IBAN: iban.toString()
        }
        const newUser = await userSrv.addContoCorrente(userDataObj, credentialsData);

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