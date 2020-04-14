const Train = require('./train');

const tf = require('@tensorflow/tfjs');
require("@tensorflow/tfjs-node");

class TrainDataset extends Train {
    constructor() {
        super();

        this.tf = tf;
        this.modelPath = 'file://./ML/model/models/';
    }

    trainDataset = (trainData, name) => {
        this.trainModel(trainData, name);
    }

    getTrainedModel = async modelName => {
        const file = `${this.modelPath}/${modelName}-model/model.json`;
        return await this.tf.loadLayersModel(file);
    }
}

module.exports = new TrainDataset;