import { validationHandler } from './validation';
import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-found.error";
import { queryNotRightHandler } from './Query.error';


export const errorHandlers = [validationHandler, notFoundHandler,
    queryNotRightHandler,genericHandler];