// middlewares/log.middleware.ts
import { Request, Response, NextFunction } from "express";
import { logModel } from "../api/LogTable/log.model";
import requestIp from "request-ip";

export const logMiddleware = (
  getOperazione: ((req: Request) => string) | string
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const oldJson = res.json.bind(res);

    res.json = (body: any) => {
      const indirizzoIp = requestIp.getClientIp(req);

      const operazione =
        typeof getOperazione === "function" ? getOperazione(req) : getOperazione;

      logModel
        .create({
          indirizzoIp,
          data: new Date(),
          operazione,
          stato: res.statusCode < 400,
          ...(res.statusCode >= 400 ? { errorMessage: body?.message } : {}),
        })
        .catch((err) => console.error("Errore logMiddleware:", err));

      return oldJson(body);
    };

    next();
  };
};
