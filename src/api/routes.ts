import { Router } from "express";
import userRouter from "./ContoCorrente/user.router";
import authRouter from "./auth/auth.router";
import movimRouter from "./MovimentiContoCorrente/movimenti.router"
const router = Router();


router.use(authRouter)
router.use('/users', userRouter);
router.use('/mov', movimRouter)
export default router;