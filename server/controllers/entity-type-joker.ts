import { BaseCtrl } from './base';
import { EntityUtils } from '../entity-utils';
import { capitalize } from 'lodash';
import {EntityTypes} from '../entities';

// TODO deixar a criação das entidades dinâmicas
// TODO criar documentação da entidade
// TODO criar regras de update

export class EntityTypeJokerCtrl extends BaseCtrl {
    model: any;

    constructor(model) {
        super();
        this.model = model;
    }

    // Insert
    insert = async (req, res) => {
        try {
            const obj = await new this.model(req.body).save();
            res.status(201).json(obj);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    };

    // Delete by id
    delete = async (req, res) => {
        try {
            const doc = await this.model.findById(req.params.id);
            await this.model.findOneAndDelete({ _id: req.params.id });

            res.status(200).json(doc);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };
}
