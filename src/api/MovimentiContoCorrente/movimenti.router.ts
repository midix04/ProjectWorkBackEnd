import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { MonNList, MovBtwDatesList, MovCatList, MovLast5List } from "./movimenti.Controller";

const router = Router();

router.get('/MovLast5List', isAuthenticated, MovLast5List );
router.get('/MonNList', isAuthenticated, MonNList );
router.get('/MovCatList', isAuthenticated, MovCatList );
router.get('/MovBtwDatesList', isAuthenticated, MovBtwDatesList );

export default router;
