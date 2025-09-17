import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddUserDTO } from "./auth.dto";
import userSrv, { UserExistsError } from "../user/user.service";
import { omit, pick } from "lodash";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../lib/auth/jwt/jwt-strategy";

export const add = async (
    req: TypedRequest<AddUserDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData = omit(req.body, 'Email', 'password');
        const credentialsData = pick(req.body, 'Email', 'password');
        const newUser = await userSrv.addContoCorrente(userData, credentialsData);
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