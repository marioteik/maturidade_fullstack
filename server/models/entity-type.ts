import * as mongoose from 'mongoose';
import {Utils} from '../utils';
import {EntityUtils} from '../entity-utils';

export interface EntityType {
    __v?: number;
    _id?: string;
    name: string;
    route: string;
    description: string;
}

const entityTypeSchema = new mongoose.Schema({
    name: {type: String, unique: true, trim: true, required: true},
    system: {
        model: {type: String, unique: true, trim: true},
        collection: {type: String, unique: true, trim: true}
    },
    route: {type: String, unique: true, lowercase: true, trim: true, required: true},
    entities: [{refId: {type: mongoose.Schema.Types.ObjectId}}],
    description: {type: String, trim: true}
});

entityTypeSchema.pre('save', function (next) {
    this.system = {
        model: Utils.convertToClassName(this.name),
        collection: Utils.convertToCollectionName(this.name),
    };

    next();
});

entityTypeSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.name) {
        this.system = {
            model: Utils.convertToClassName(this._update.name),
            collection: Utils.convertToCollectionName(this._update.name),
        };
    }
    next();
});

entityTypeSchema.pre('findOneAndRemove', async function (next) {
    const doc = await this.model.findById(this._conditions._id);

    EntityUtils.removeCollectionEntityMongoose(doc.entities);
    EntityUtils.deleteDynamicEntity(doc);

    next();
});

export const EntityType = mongoose.model('EntityType', entityTypeSchema);
