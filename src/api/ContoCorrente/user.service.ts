import { round } from "lodash";
import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import { ContoCorrente } from "./user.entity";
import { ContoCorrenteModel } from "./user.model";
import bcrypt from 'bcrypt';
import { QueryNotRightError } from "../../errors/Query.error";

export class UserExistsError extends Error {
    constructor() {
        super();
        this.name = 'UserExists';
        this.message = 'username already in use';
    }
}

export class UserService {

    async addContoCorrente(user: ContoCorrente, credentials: {email: string, password: string}): Promise<ContoCorrente> {
        const existingIdentity = await UserIdentityModel.findOne({'credentials.Email': credentials.email});
        if (existingIdentity) {
            throw new UserExistsError();
        }
        const newContoCorrente = await ContoCorrenteModel.create(user);
        
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
    
        await UserIdentityModel.create({
            provider: 'local',
            ContoCorrente: newContoCorrente.id,
            credentials: {
                Email: credentials.email,
                hashedPassword
            }
        });
    
        return newContoCorrente;
    }
    

}


export default new UserService();