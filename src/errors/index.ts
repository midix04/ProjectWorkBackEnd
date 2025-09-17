import { validationHandler } from './validation';
import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-found.error";
import { queryNotRightHandler } from './Query.error';
import { userNotProfHandler } from './not-prof.error';
import { ClassRoomNotFoundErrorHandler } from './classRoom-not-found.error';
import { wrongClassroomErrorHandler } from './wrongClass.error';
import { WrongAssigmentErrorHandler } from './WrongAssigment.error';
import { AssigmentAlrCompletedHandler } from './assigment-alr-completed';

export const errorHandlers = [validationHandler, notFoundHandler,AssigmentAlrCompletedHandler,
    queryNotRightHandler,userNotProfHandler, ClassRoomNotFoundErrorHandler,wrongClassroomErrorHandler,WrongAssigmentErrorHandler,
    genericHandler];