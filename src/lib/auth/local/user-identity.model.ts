import { Schema, model } from 'mongoose';
import { UserIdentity } from './user-identity.entity';

const userIdentitySchema = new Schema<UserIdentity>({
    ContoCorrente: { type: Schema.Types.ObjectId, ref: 'TContoCorrente' },
    provider: { type: String, default: 'local'},
    credentials: {
        type: {
            Email: String,
            hashedPassword: String
        },
        _id: false,
    }},{
    });

userIdentitySchema.pre('findOne', function(next) {
    this.populate('ContoCorrente');
    next();
})

export const UserIdentityModel = model<UserIdentity>('UserIdentity', userIdentitySchema);