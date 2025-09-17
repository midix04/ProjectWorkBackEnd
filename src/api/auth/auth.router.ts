import { Router } from "express";
import { validate } from "../../lib/validation-middleware";
import { AddUserDTO } from "./auth.dto";
import { register, login } from "./auth.controller";

const router = Router();

router.post('/register', validate(AddUserDTO), register);
router.post('/login', login);

export default router;