import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { AddMov, MovLast5List, MonNList, MovCatList, MovBtwDatesList } from "./movimenti.controller";


const router = Router();

router.post('/AddMov', isAuthenticated, AddMov)
router.get('/MovLast5List', isAuthenticated, MovLast5List );
router.get('/MonNList', isAuthenticated, MonNList );
router.get('/MovCatList', isAuthenticated, MovCatList );
router.get('/MovBtwDatesList', isAuthenticated, MovBtwDatesList );

export default router;
