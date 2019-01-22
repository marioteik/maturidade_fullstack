import { BaseCtrl } from './base';

export class EntityJokerCtrl extends BaseCtrl {
    model;
    documentation;

    constructor(schema) {
        super();

        this.model = schema[0];

        if (schema[1]) {
            this.documentation = schema[1];
        }
    }

    // Delete by id
    delete = async (req, res) => {
        try {
            const doc = await this.model.findOneAndRemove({_id: req.params.id});
            res.status(200).json(doc);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    };

    getDocumentation = (req, res) => {
        res.send(JSON.stringify(this.documentation));
    };
}
