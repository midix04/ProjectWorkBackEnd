import { Schema, model } from 'mongoose';
import { MovimentiEntity } from './movimenti.entity';

const movimentiEntitySchema = new Schema<MovimentiEntity>({
    data: Date,
    importo:  Number,
    saldo: Number,
    categoriaMovimento: { type: Schema.Types.ObjectId, ref: 'CategorieMovimenti' },
    descrizioneEstesa: String,
    contoCorrente: { type: Schema.Types.ObjectId, ref: 'TContoCorrente' },
    });

movimentiEntitySchema.pre('findOne', function(next) {
    this.populate('contoCorrente');
    this.populate('categoriaMovimento')
    next();
})

export const movimentiModel = model<MovimentiEntity>('MovimentiEntity', movimentiEntitySchema);