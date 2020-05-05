const rimraf = require('rimraf');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const Train = require('./train');

const db = require('../../../db');
const util = require('../../utility');
const dtset = require('../dataset');

class Model {
    constructor() {
        this.pwd = 'rest/engine/model/models';
    }

    backtest = async (req, send) => {
        let dataset = await dtset.get('5eb00198b35b30693421ec3a');
        let model = await this.get(req.body.model._id);

        let test = new util.test;
        let result = await test.backtest(model, dataset.dataset);

        console.log('result', result)
    }

    train = async (req, send) => {
        // Get dataset
        let dataset = await dtset.get(req.body.config.dataset);

        // // Train model
        const train = new Train(req.body.config);
        const model = await train.trainModel(dataset.dataset);

        let test = new util.test;
        let result = await test.backtest(model.model, dataset.dataset);

        // Combine backtest result
        model.result = { ...model.result, ...result };

        // Update db
        let saved = await this.save(req.body.config, model);

        if (saved) {
            // Get, send all models
            const models = await db.models.Model.find();
            return send({ models }); // Send back all models
        }
    }

    save = async (config, model) => {
        try {
            await db.models.Model.create({ ...config, ...{ result: model.result } });

            const path = `file://./${this.pwd}/${config.modelName}-model`;
            await model.model.save(path);

        } catch (err) { throw err };
    }

    get = async id => {
        try {
            let model = await db.models.Model.findOne({ _id: id });
            const file = `file://./${this.pwd}/${model.modelName}-model/model.json`;
            return await tf.loadLayersModel(file);
        }
        catch (err) { throw err };
    }

    remove = async (req, send) => {
        let { id, modelName } = req.params;

        // Remove local file
        try {
            const model = await db.models.Model.findByIdAndDelete({ _id: id });
            rimraf(`${this.pwd}/${model.modelName}-model`, res => {
                send({ success: true });
            });
        }
        catch (err) { throw err };


    }
}

module.exports = new Model;