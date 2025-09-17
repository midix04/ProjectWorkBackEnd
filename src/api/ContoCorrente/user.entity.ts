import { Double, ObjectId } from "mongoose";

export type ContoCorrente = {
    contoCorrenteID?: string;
    cognomeTitolare: string;
    nomeTitolare: string;
    dataApertuta: Date;
    IBAN: string;
    email: string;
}