import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";

const router = Router();

router.post('/list', listmovimenti);

export default router;

