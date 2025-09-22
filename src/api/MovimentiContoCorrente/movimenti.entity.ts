import { Double, ObjectId, Types } from "mongoose";
import { ContoCorrente } from "../ContoCorrente/user.entity";
import { CategorieMovimenti } from "../CategorieMovimenti/CategorieMovimenti.entity";

export type MovimentiEntity = {
    importo: number
    movimentoID?: string,
    contoCorrente?: ContoCorrente,
    data: Date,
    saldo: number,
    categoriaMovimento: string | CategorieMovimenti | Types.ObjectId,
    descrizioneEstesa: string;
}