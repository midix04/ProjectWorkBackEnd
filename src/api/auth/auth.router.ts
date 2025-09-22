import { Router } from "express";
import passport from "passport";
import { validate } from "../../lib/validation-middleware";
import { AddUserDTO } from "./auth.dto";
import { register, login, changePassword } from "./auth.controller";

const router = Router();

router.post('/register', validate(AddUserDTO), register);
router.post('/login', login);
router.post("/change-password", passport.authenticate("jwt", { session: false }),changePassword);

export default router;