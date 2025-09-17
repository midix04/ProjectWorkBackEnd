import { Schema, model } from 'mongoose';
import { MovimentiEntity } from './movimenti.entity';

const movimentiEntitySchema = new Schema<MovimentiEntity>({
    data: Date,
    saldo: Float32Array,
    categoriaMovimento: String,
    descrizioneEstesa: String,
    contoCorrente: { type: Schema.Types.ObjectId, ref: 'TContoCorrente' },
    });

movimentiEntitySchema.pre('findOne', function(next) {
    this.populate('ContoCorrente');
    next();
})

export const movimentiModel = model<MovimentiEntity>('MovimentiEntity', movimentiEntitySchema);