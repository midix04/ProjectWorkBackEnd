import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { AddMov, MovLast5List, MovCatList, MovBtwDatesList, exp1, exp2, exp3, MovLastNList, getMovimento } from "./movimenti.controller";
import { logMiddleware } from "../../lib/logMiddleware";


const router = Router();

router.post(
  "/AddMov",
  isAuthenticated,
  logMiddleware((req) => {
    const cat = Number(req.body.categoriaMovimento);;
    switch (cat) {
      case 1:
        return "Ricarica telefono";
      case 2:
        return "Prelievo effettuato";
      case 3:
        return "Bonifico in uscita";
      default:
        return "Movimento generico";
    }
  }),
  AddMov
);
router.get('/MovLast5List', isAuthenticated, MovLast5List );// ricmov1
router.get('/MovLastNList', isAuthenticated, MovLastNList );
router.get('/MovCatList', isAuthenticated, MovCatList );//ricmov2
router.get('/MovBtwDatesList', isAuthenticated, MovBtwDatesList );//ricmov3
router.get('/:id', isAuthenticated, getMovimento );
router.get('/exp1', isAuthenticated, exp1 );
router.get('/exp2', isAuthenticated, exp2 );
router.get('/exp3', isAuthenticated, exp3 );
export default router;
