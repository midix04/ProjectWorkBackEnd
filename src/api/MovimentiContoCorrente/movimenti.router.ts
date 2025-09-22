import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { AddMov, MovLast5List, MovCatList, MovBtwDatesList, exp1, exp2, exp3 } from "./movimenti.controller";


const router = Router();

router.post('/AddMov', isAuthenticated, AddMov)
router.get('/MovLast5List', isAuthenticated, MovLast5List );// ricmov1
router.get('/MovCatList', isAuthenticated, MovCatList );//ricmov2
router.get('/MovBtwDatesList', isAuthenticated, MovBtwDatesList );//ricmov3
router.get('/exp1', isAuthenticated, exp1 );
router.get('/exp2', isAuthenticated, exp2 );
router.get('/exp3', isAuthenticated, exp3 );
export default router;
