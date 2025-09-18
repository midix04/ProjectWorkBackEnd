// types/express.d.ts
import { ObjectId } from 'mongoose';
import { UserIdentity } from '../src/lib/auth/local/user-identity.entity';

declare global {
  namespace Express {
    interface User extends UserIdentity {
      // Shortcut per avere direttamente l'ID del conto corrente
      contoCorrenteID?: ObjectId;
    }
  }
}

export {};
