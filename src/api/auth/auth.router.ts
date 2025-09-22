import { Router } from "express";
import passport from "passport";
import { validate } from "../../lib/validation-middleware";
import { AddUserDTO } from "./auth.dto";
import { register, login, changePassword } from "./auth.controller";
import { logMiddleware } from "../../lib/logMiddleware";

const router = Router();

router.post('/register', validate(AddUserDTO),  logMiddleware("Regisrazione utente"), register);
router.post('/login',  logMiddleware("Login utente"), login);
router.post("/change-password", passport.authenticate("jwt", { session: false }), logMiddleware("Cambio Password"), changePassword);

export default router;
