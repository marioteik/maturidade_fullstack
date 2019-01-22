import * as mongoose from 'mongoose';

export interface EntityType {
    __v?: number;
    _id?: string;
    name: string;
    route: string;
    description: string;
}

const schema = new mongoose.Schema({
    machineName: { type: String, require: true },
    refId: { type: String },
    route: { type: String, unique: true, lowercase: true, trim: true, required: true }
});



export const EntityType = mongoose.model('EntityType', schema);
