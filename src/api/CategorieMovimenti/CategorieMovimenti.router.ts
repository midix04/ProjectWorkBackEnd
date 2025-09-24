import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { listmovimenti } from "./CategorieMovimenti.controller";

const router = Router();

router.get('/list', listmovimenti);

export default router;

