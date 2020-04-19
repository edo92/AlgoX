class ML {
    constructor() {
        this.state = {};
        this.dataset = require('./Dataset');
        this.models = require('./model');
        this.predict = require('./predict');
        this.analize = require('./analize');
    }

    createDataset = async (rawDataset, config) => {
        this.dataset.createDataset(rawDataset, config);
    }

    train = async (options, callback) => {
        // Get train dataset
        let dataset = await this.dataset.getDataset(options.type);
        // Train dataset with wl datasetmodule
        return await this.models.trainDataset(dataset, options, callback);
    }

    prediction = async data => {
        let model = await this.models.getTrainedModel('wl');
        return await this.predict.predictSet(model, data);
    }

    analitic = async () => {
        let data = await this.dataset.getDataset('wl');
        this.analize.analizeModel(data, this);
    }
}

module.exports = new ML;