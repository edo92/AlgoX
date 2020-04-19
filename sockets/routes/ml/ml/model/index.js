const Train = require('./train');

const rimraf = require("rimraf");
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

class TrainDataset extends Train {
    constructor() {
        super();

        this.tf = tf;
        this.pwd = 'sockets/routes/ml/ml/model/models'
        this.modelPath = `file://./${this.pwd}/`;
    }

    trainDataset = async (dataset, config, callback) => {
        this.trackProgress = callback;
        this.config = config;
        return await this.trainModel(dataset);
    }

    getTrainedModel = async modelName => {
        const file = `${this.modelPath}/${modelName}-model/model.json`;
        return await this.tf.loadLayersModel(file);
    }

    deleteModel = async modelName => {
        const file = `${this.pwd}/${modelName}-model`;
        rimraf(file, res => {
            console.log('res', res)
        });
    }
}

module.exports = new TrainDataset;