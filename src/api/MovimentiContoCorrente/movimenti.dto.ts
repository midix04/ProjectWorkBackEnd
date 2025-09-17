// movimenti.dto.ts
import { Types } from 'mongoose';

export class MovimentiDto {
  saldo: number;
  categoriaMovimento: string;
  descrizioneEstesa: string;
  ContoCorrente: Types.ObjectId | string; 
  email: string
}
