import { Router } from "express";
import userRouter from "./ContoCorrente/user.router";
import authRouter from "./auth/auth.router";
const router = Router();


router.use(authRouter)
router.use('/users', userRouter);
export default router;