import { IsNotEmpty } from 'class-validator';
import { Schema, model } from 'mongoose';
import { CategorieMovimenti } from './movimenti.entity';


const CategorieMovimentiSchema = new Schema<CategorieMovimenti>({
    NomeCategoria: String,
    tipologia: Boolean
},{
  //non salvo la versione  aiuto commit prova
  versionKey: false
});

CategorieMovimentiSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id;
        delete ret._v;
        return ret;
    }
});

CategorieMovimentiSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret._v;
        return ret;
    }
});


export const ContoCorrenteModel = model<CategorieMovimenti>('TCategorieMovimenti', CategorieMovimentiSchema);