// movimenti.dto.ts
import { Types } from 'mongoose';

export class MovimentiDto {
  importo: number;
  saldo: number;
  categoriaMovimento: string;
  descrizioneEstesa: string;
  ContoCorrente: Types.ObjectId | string; 
  email: string
}
