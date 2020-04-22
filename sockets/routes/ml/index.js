const db = require('./db')
const ml = require('./ml');
const util = require('./utility');

class ML {
    createDataset = async (data, callback) => {
        // Get all fights in every event
        let fightList = await db.getAllFights();

        // Conver fight list to raw data
        const rawOptions = { shuffle: true, format: data.type, dataset: true };
        let rawDataset = await util.rawDataset(fightList, callback, rawOptions);

        // Create dataset in db
        let setInfo = await ml.createDataset(rawDataset, { ...data });
        await db.saveDataset({ ...data, ...setInfo });

        // Callback
        callback({ dataset: { creating: false } });
    }

    train = async (data, callback) => {
        let results = await ml.train(data, callback);

        // Get model and dataset for backtest
        let model = await ml.models.getTrainedModel(data.modelName);
        let dataset = await ml.dataset.getDataset(data.dataset);

        // Analize results
        let analized = await ml.analize.analizeModel(model, dataset);
        let saveData = { ...data, ...{ results: { ...results, ...analized } } };
        await db.saveModel(saveData);
        callback({ train: { creating: false } });
    }

    predict = async (config, callback) => {
        let predictData = await db.getDraft();
        const test = () => { }
        let rawDataset = await util.rawDataset(predictData.fights, test, { shuffle: true, format: 'wl', plain: true });
        let results = await ml.prediction(rawDataset, predictData, config);
        callback({ fights: results, predictLoad: false, generate: true });
    }

    get = async (data, callback) => {
        let models = await db.getModels();
        callback({ models });
        let datasets = await db.getDatasets();
        callback({ datasets });
    }

    deleteModel = async data => {
        ml.models.deleteModel(data.model.modelName);
        return await db.deleteModel(data.model._id);
    }

    deleteDataset = async data => {
        ml.dataset.deleteDataset(data.dataset.datasetName);
        return await db.deleteDataset(data.dataset._id);
    }
}

module.exports = new ML;    