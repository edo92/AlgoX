const rimraf = require('rimraf');

const db = require('../../../db');
const util = require('../../utility');

const Train = require('./train');
const dataset = require('../dataset');

class Model {
    constructor() {
        this.pwd = 'rest/engine/model/models';
    }

    train = async (req, send) => {
        // Get dataset
        const dataset = await this.get(req.body.config.dataset);

        // Create model (initial)
        const created = await db.models.Model.create(req.body.config);

        // // Train model
        const train = new Train(req.body.config);
        const model = await train.trainModel(dataset);

        // Backtest
        let test = new util.test;
        let result = await test.backtest(model.model, dataset);


        let dt = await db.models.Dataset.find({ _id: req.body.config.dataset });
        await db.models.Dataset.findOneAndUpdate(
            { _id: req.body.config.dataset },
            { used: dt.used = + 1 }
        )

        // Combine backtest results with model result
        model.result = { ...model.result, ...result };

        // Update db
        await this.save(created._id, model);

        // Get, send all models
        const models = await db.models.Model.find();
        return send({ models }); // Send back all models
    }

    save = async (id, model) => {
        try {
            const path = `file://./${this.pwd}/${id}-model`;
            const saved = await model.model.save(path);
            if (saved) {
                // Save traind data in save model object
                await db.models.Model.findOneAndUpdate(
                    { _id: id },
                    { $set: { result: model.result } },
                    { new: true }
                )
            }
        } catch (err) { throw err };
    }

    get = async id => {
        try {
            let data = await dataset.get(id);
            if (data) {
                return await util.convert.convert3d(data, { shuffle: true });
            }
        } catch (err) { throw err };
    }

    remove = async (req, send) => {
        let { id } = req.params;

        // Remove local file
        rimraf(`${this.pwd}/${id}-model`, async res => {
            try {
                await db.models.Model.findByIdAndDelete({ _id: id });
                send({ success: true });
            }
            catch (err) { throw err };
        });
    }
}

module.exports = new Model;