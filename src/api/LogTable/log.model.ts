import { Schema, model } from 'mongoose';
import { logEntity } from './log.entity';

const logEntitySchema = new Schema<logEntity>({
    indirizzoIp: String,
    data: Date,
    operazione: String,
    stato: Boolean
    });

logEntitySchema.pre('findOne', function(next) {
    this.populate('contoCorrente');
    next();
})

export const logModel = model<logEntity>('TLog', logEntitySchema);