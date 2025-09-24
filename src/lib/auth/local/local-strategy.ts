import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { UserIdentityModel } from "./user-identity.model";
import bcrypt from 'bcrypt';

passport.use(
    new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async (Email, password, done) => {
        try {
            const identity = await UserIdentityModel.findOne({'credentials.Email': Email});
            if (!identity) {
                done(null, false, { message: `email ${Email} not found` });
                return;
            }

            const match = await bcrypt.compare(password, identity.credentials.hashedPassword);

            const obj = {
             ...identity.toObject().ContoCorrente,
             password: identity.credentials.hashedPassword
            };
            if (match) {
                done(null, (obj as any) );
                return;
            }
            done(null, false, { message: 'invalid password' });
        } catch(err) {
            done(err);
        }
}))