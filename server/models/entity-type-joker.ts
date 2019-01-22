import * as mongoose from 'mongoose';
import {Utils} from '../utils';

export const inputType = [
    'text',
    'password',
    'color',
    'email',
    'number',
    'search',
    'url',
    'date',
    'datetime-local',
    'month',
    'time',
    'week'
];

export const formElements = [
    'input',
    'select',
    'textarea',
    'range',
    'date',
    'checkbox',
    'radio',
    'autocomplete'
];

export class EntityTypeJoker {
    static entitySchema = (entityType) => {
        return {
            name: {type: String, required: true, index: true, unique: true, trim: true},
            description: {type: String, trim: true},
            system: {
                model: {type: String, unique: true, trim: true},
                collection: {type: String, unique: true, trim: true}
            },
            entityTypeId: {type: mongoose.Schema.Types.ObjectId, default: entityType._id},
            route: {type: String, required: true, index: true, unique: true, trim: true},
            formSchema: {
                type: [new mongoose.Schema(
                    {
                        name: {type: String, required: true},
                        type: {type: String, enum: inputType, default: 'text'},
                        formElement: {type: String, required: true, enum: formElements, default: 'input'},
                        defaultValue: {type: mongoose.Schema.Types.Mixed},
                        readonly: Boolean,
                        disabled: Boolean,
                        size: Number,
                        minlength: Number,
                        maxlength: Number,
                        autocomplete: Boolean,
                        autofocus: Boolean,
                        form: String,
                        list: String,
                        min: Number,
                        max: Number,
                        multiple: Boolean,
                        pattern: String,
                        placeholder: String,
                        required: Boolean,
                        step: Number,
                        onDatatable: {type: Boolean, default: false},
                    }
                )]
            }
        };
    };

    createSchema(entityType) {
        const schema = new mongoose.Schema(EntityTypeJoker.entitySchema(entityType));

        schema.pre('save', function (next) {
            this.system = {
                model: Utils.convertToClassName(`${entityType.system.model}${this.name}`),
                collection: Utils.convertToCollectionName(`${entityType.system.model}${this.name}`),
            };
            this.route = `${entityType.route}/entity/${this.route}`;

            next();
        });

        schema.post('save', function () {
            mongoose.model('EntityType')
                .findOneAndUpdate({'system.model': entityType.system.model}, {$push: {entities: {refId: this._id}}}, {new: true});
        });

        schema.pre('findOneAndUpdate', function (next) {
            if (this._update.name) {
                this._update.system = {
                    model: Utils.convertToClassName(`${entityType.system.model}${this._update.name}`),
                    collection: Utils.convertToCollectionName(`${entityType.system.model}${this._update.name}`),
                };
                this._update.route = `${entityType.route}/entity/${this._update.route.split('/').slice(-1).pop()}`;
            }

            next();
        });

        return mongoose.model(entityType.system.model, schema, entityType.system.collection);
    }
}
