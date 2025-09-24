import { ObjectId, Types } from "mongoose";
import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import { MovimentiEntity } from "./movimenti.entity";
import { movimentiModel } from "./movimenti.model";
import { CategorieMovModel } from "../CategorieMovimenti/CategorieMovimenti.model";
import { CategorieMovimenti } from "../CategorieMovimenti/CategorieMovimenti.entity";
import { ContoCorrenteModel } from "../ContoCorrente/user.model";

export class MovService {
  async addMovimento(
    movimento: MovimentiEntity,
    Email: string,
  ): Promise<MovimentiEntity> {
    try {
      const identity = await UserIdentityModel.findOne({
        "credentials.Email": Email,
      });
      if (!identity) throw new Error(`Email ${Email} not found`);

      movimento.contoCorrente = identity.ContoCorrente;

      const tipoMovimento = await CategorieMovModel.findOne({
        CategoriaMovimentoID: movimento.categoriaMovimento,
      });
      if (!tipoMovimento) throw new Error(`conto not found`);

      movimento.categoriaMovimento = tipoMovimento.id;

      let saldo = 0;
      if (!(tipoMovimento.CategoriaMovimentoID == "4")) {
        saldo = await this.getLastSaldo((identity.ContoCorrente as any).id);
      }

      if (tipoMovimento.tipologia == false) {
        saldo -= movimento.importo;
        movimento.saldo -= movimento.importo;
        if (saldo < 0) {
          return Promise.reject(new Error(`Soldi non sufficienti nel Conto`));
        }
      } else {
        movimento.saldo += movimento.importo;
      }

      const newContoCorrente = await movimentiModel.create(movimento);

      return (await newContoCorrente.populate("categoriaMovimento")).populate(
        "contoCorrente",
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getLastNMovimenti(
    contoCorrente: string | undefined,
    n: number,
  ): Promise<{ movimenti: MovimentiEntity[] }> {
    const movimenti = await movimentiModel
      .find({ contoCorrente: contoCorrente })
      .sort({ data: -1 })
      .limit(n)
      .select("data importo saldo CategoriaMovimento descrizioneEstesa")
      .lean()
      .populate("categoriaMovimento");

    return { movimenti };
  }



  async getMovimentiBetweenDates(
    contoCorrente: string,
    startDate: Date,
    endDate: Date,
    n: number,
  ): Promise<any[]> {
    const movimenti = await movimentiModel
      .find({
        contoCorrente: contoCorrente,
        data: { $gte: startDate, $lte: endDate },
      })
      .sort({ data: -1 })
      .limit(n)
      .select("data importo categoriaMovimento")
      .lean().populate("categoriaMovimento");

    return movimenti;
  }

  async getLastSaldo(contoCorrente: string) {
    const saldo = await movimentiModel
      .findOne({ contoCorrente: new Types.ObjectId(contoCorrente) })
      .sort({ data: -1 })
      .populate("contoCorrente")
      .exec();
    if (!saldo) {
      throw new Error(`Ultimo saldo non trovato`);
    }
    return saldo?.saldo;
  }

  async findUser(iban: string) {
    const destinatario = await ContoCorrenteModel.findOne({ IBAN: iban }).select("email _id")
    if(!destinatario){
      throw new Error(`Iban non trovato`);
    }
    return destinatario;
}

}

export default new MovService();
