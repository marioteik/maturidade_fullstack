import * as mongoose from 'mongoose';
import {capitalize, camelCase} from 'lodash';
import {Utils} from '../utils';

export class EntityJoker {
    entity: any;

    constructor(ent) {
        this.entity = ent;
    }

    buildSchema() {
        let schema: any = {};

        this.entity.formSchema.forEach(el => {
            let keyName = camelCase(el.name);

            schema[keyName] = {};
            schema[keyName].type = 'String';

            if (el.defaultValue) {
                schema[keyName].default = el.defaultValue;
            } else if (el.required) {
                schema[keyName].required = el.required;
            } else if (el.validateKey) {
                schema[keyName].validate = el.validateKey;
            } else if (el.unique) {
                schema[keyName].unique = el.unique;
            }
        });

        schema.entityId = {type: mongoose.Schema.Types.ObjectId, default: this.entity._id};

        return schema;
    };

    createSchema() {
        const schema = this.buildSchema();
        const entitySchema = new mongoose.Schema(schema);

        /*entitySchema.post('save', function () {
            mongoose.model('EntityType')
                .findOneAndUpdate({'system.model': this.entity.system.model}, {$push: {entities: {refId: this._id}}}, {new: true});
        });

        entitySchema.pre('findOneAndUpdate', function (next) {
            if (this._update.name) {
                this._update.system = {
                    model: Utils.convertToClassName(`${entityType.system.model}${this._update.name}`),
                    collection: Utils.convertToCollectionName(`${entityType.system.model}${this._update.name}`),
                };
            }

            if (this._update.route) {
                this.route = `${entityType.route}/entity/${this._update.route}`;
            }

            next();
        });*/

        return [mongoose.model(this.entity.system.model, entitySchema, this.entity.system.collection), schema];
    }
}
