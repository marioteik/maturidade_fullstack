import {EntityType} from '../models/entity-type';
import {BaseCtrl} from './base';
import {EntityUtils} from '../entity-utils';

export class EntityTypeCtrl extends BaseCtrl {
    model = EntityType;
    app: any;

    constructor() {
        super();
    }

    // Insert
    insert = async (req, res) => {
        try {
            const obj = await new this.model(req.body).save();
            EntityUtils.handleEntityTypeDynamicCRUD(obj.toObject());
            res.status(201).json(obj);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    };

    // Update by id
    update = async (req, res) => {
        try {
            const oldObj = await this.model.find({ _id: req.params.id });
            const newObj = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true});
            EntityUtils.updateEntityTypeDynamicCRUD(oldObj, newObj, EntityTypeCtrl);

            res.status(202).json(newObj);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };

    // Delete by id
    delete = async (req, res) => {
        try {
            const doc = await this.model.findOneAndRemove({_id: req.params.id});
            res.status(200).json(doc);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    };
}
