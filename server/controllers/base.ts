export abstract class BaseCtrl {

    abstract model: any;

    // Get all
    getAll = async (req, res) => {
        try {
            const docs = await this.model.find({});
            res.status(200).json(docs);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };

    // Get all
    getAllRuntime = async () => {
        try {
            return await this.model.find({});
        } catch (err) {
            return { error: err.message };
        }
    };

    // Count all
    count = async (req, res) => {
        try {
            const count = await this.model.count();
            res.status(200).json(count);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };

    // Insert
    insert = async (req, res) => {
        try {
            const obj = await new this.model(req.body).save();
            res.status(201).json(obj);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };

    // Get by id
    get = async (req, res) => {
        try {
            const obj = await this.model.findOne({ _id: req.params.id });
            res.status(200).json(obj);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    };

    // Update by id
    update = async (req, res) => {
        try {
            const obj = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true});
            res.status(202).json(obj);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };

    // Delete by id
    delete = async (req, res) => {
        try {
            const obj = await this.model.findOneAndDelete({ _id: req.params.id });
            res.status(204).json(obj);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };
}
