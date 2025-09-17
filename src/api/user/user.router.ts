import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { list, me } from "./user.controller";

const router = Router();

router.get('/me', isAuthenticated, me );
router.get('/', isAuthenticated, list)

export default router;