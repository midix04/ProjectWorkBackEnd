import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import { MovimentiEntity } from "./movimenti.entity";
import { movimentiModel } from "./movimenti.model";

export class MovService {

    async addContoCorrente(movimento: MovimentiEntity, Email: string): Promise<MovimentiEntity> {
        const identity = await UserIdentityModel.findOne({ 'credentials.Email': Email });
        console.log(identity)
        if (!identity) {
            throw new Error(`Email ${Email} not found`);
        }
        movimento.contoCorrente = identity.ContoCorrente;  

        const newContoCorrente = await movimentiModel.create(movimento);
        return newContoCorrente;
    }
}

export default new MovService();
