import  './local/local-strategy';
import './jwt/jwt-strategy';

import { ContoCorrente as iUser } from '../../api/ContoCorrente/user.entity';

declare global {
    namespace Express {
        interface Request {
            classRole?: string; 
          }
 interface User extends iUser { }
    }
}