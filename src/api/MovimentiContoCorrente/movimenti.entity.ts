import { Double } from "mongoose";
import { ContoCorrente } from "../ContoCorrente/user.entity";

export type MovimentiEntity = {
    movimentoID: string,
    contoCorrente: ContoCorrente,
    data: Date,
    saldo: Float32Array,
    categoriaMovimento: string,
    descrizioneEstesa: string;
}