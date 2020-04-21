class ML {
    constructor() {
        this.state = {};
        this.dataset = require('./Dataset');
        this.models = require('./model');
        this.predict = require('./predict');
        this.analize = require('./analize');
    }

    createDataset = async (rawDataset, config) => {
        return await this.dataset.createDataset(rawDataset, config);
    }

    train = async (options, callback) => {
        // Get dataset by passed dataset name
        let dataset = await this.dataset.getDataset(options.dataset);
        // Train dataset with selected name
        return await this.models.trainDataset(dataset, options, callback);
    }

    prediction = async (rawDataset, predictData, config) => {
        let model = await this.models.getTrainedModel(config.model);
        return await this.predict.predictSet(model, rawDataset, predictData);
    }

    analitic = async () => {
        let dataset = await this.dataset.getDataset('wl');
        this.analize.analizeModel(dataset, this);
    }
}

module.exports = new ML;