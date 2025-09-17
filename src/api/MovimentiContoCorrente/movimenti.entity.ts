import { Double } from "mongoose";
import { ContoCorrente } from "../ContoCorrente/user.entity";
import { CategorieMovimenti } from "../CategorieMovimenti/CategorieMovimenti.entity";

export type MovimentiEntity = {
    movimentoID?: string,
    contoCorrente?: ContoCorrente,
    data: Date,
    saldo: number,
    categoriaMovimento: string,
    descrizioneEstesa: string;
}