import { Schema, model } from 'mongoose';
import { ContoCorrente } from './user.entity';

const ContoCorrenteSchema = new Schema<ContoCorrente>({
    cognomeTitolare: String,
    nomeTitolare: String,
    dataApertuta: Date,
    IBAN: String,
    Email: String
},{
  //non salvo la versione   
  versionKey: false
});

ContoCorrenteSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id;
        delete ret._v;
        return ret;
    }
});

ContoCorrenteSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret._v;
        return ret;
    }
});

ContoCorrenteSchema.virtual('fullName').get(function() {
    return `${this.nomeTitolare} ${this.cognomeTitolare}`;
})

export const ContoCorrenteModel = model<ContoCorrente>('TContoCorrente', ContoCorrenteSchema);