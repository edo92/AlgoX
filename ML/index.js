class ML {
    constructor() {
        this.state = {};
        this.dataset = require('./Dataset');
        this.models = require('./model');
        this.predict = require('./predict');
        this.analize = require('./analize');
    }

    createDataset = async (rawDataset, options) => {
        this.dataset.createDataset(rawDataset, options);
    }

    train = async () => {
        // Get train dataset
        let trainData = await this.dataset.getDataset('wl');
        // Train dataset with wl datasetmodule
        this.models.trainDataset(trainData, 'wl');
    }

    prediction = async target => {
        let model = await this.models.getTrainedModel('wl');
        return await this.predict.predictSet(model, target);
    }

    analitic = async () => {
        let data = await this.dataset.getDataset('wl');
        this.analize.analizeModel(data, this);
    }
}

module.exports = new ML;