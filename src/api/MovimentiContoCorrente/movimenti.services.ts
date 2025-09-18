import { ObjectId, Types } from "mongoose";
import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import { MovimentiEntity } from "./movimenti.entity";
import { movimentiModel } from "./movimenti.model";

export class MovService {

    async addMovimento(movimento: MovimentiEntity, Email: string): Promise<MovimentiEntity> {
        const identity = await UserIdentityModel.findOne({ 'credentials.Email': Email });
        console.log(identity)
        if (!identity) {
            throw new Error(`Email ${Email} not found`);
        }
        movimento.contoCorrente = identity.ContoCorrente;  

        const newContoCorrente = await movimentiModel.create(movimento);
        return newContoCorrente;
    }

async getLastNMovimenti(contoCorrenteID: string | undefined, n: number): Promise<{ movimenti: any[]; saldoFinale: number }> {
    const movimenti = await movimentiModel.find({ contoCorrenteID: contoCorrenteID })
        .sort({ data: -1 })
        .limit(n)
        .select("data importo saldo CategoriaMovimentoID descrizioneEstesa")
        .lean();

    const saldoFinale = movimenti.length > 0 ? movimenti[0].saldo : 0;
    //ciaone
    return { movimenti, saldoFinale };
}

async getLastSaldo(contoCorrenteID: string) {
    const saldo = await movimentiModel
        .findOne({ contoCorrente: new Types.ObjectId(contoCorrenteID) }) 
        .sort({ data: -1 }) 
        .populate('contoCorrente') 
        .exec();

    return saldo?.saldo;
}

}

export default new MovService();
