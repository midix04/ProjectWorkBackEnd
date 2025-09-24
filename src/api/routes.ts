import { Router } from "express";
import userRouter from "./ContoCorrente/user.router";
import authRouter from "./auth/auth.router";
import movimRouter from "./MovimentiContoCorrente/movimenti.router"
import catRouter   from "./CategorieMovimenti/CategorieMovimenti.router"
const router = Router();


router.use(authRouter)
router.use('/users', userRouter);
router.use('/mov', movimRouter)
router.use('/cat', catRouter) ;
export default router;