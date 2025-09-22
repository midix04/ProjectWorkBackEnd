import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import { ContoCorrente } from "./user.entity";
import { ContoCorrenteModel } from "./user.model";
import bcrypt from 'bcrypt';

export class UserExistsError extends Error {
    constructor() {
        super();
        this.name = 'UserExists';
        this.message = 'username already in use';
    }
}

export class UserService {

    async addContoCorrente(user: ContoCorrente, credentials: { email: string, password: string }): Promise<ContoCorrente> {
        const existingIdentity = await UserIdentityModel.findOne({ 'credentials.Email': credentials.email });
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

    // 🔹 Trova le credenziali e i dati dell'utente tramite ID
    async findById(userId: string) {
        const user = await ContoCorrenteModel.findById(userId);
        if (!user) return null;

        const identity = await UserIdentityModel.findOne({ ContoCorrente: userId });
        if (!identity) return null;

        return {
            ...user.toObject(),
            email: identity.credentials.Email,
            passwordHash: identity.credentials.hashedPassword
        };
    }

    // 🔹 Aggiorna la password
    async updatePassword(userId: string, newPasswordHash: string) {
        return UserIdentityModel.updateOne(
            { ContoCorrente: userId },
            { $set: { "credentials.hashedPassword": newPasswordHash } }
        );
    }
}

export default new UserService();
