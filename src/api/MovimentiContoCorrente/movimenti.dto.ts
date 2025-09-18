// movimenti.dto.ts
import { Types } from 'mongoose';

export class MovimentiDto {
  importo: number;
  categoriaMovimento: string;
  descrizioneEstesa: string;
  email: string
}
