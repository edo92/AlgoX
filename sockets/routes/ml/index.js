const db = require('./db')
const ml = require('./ml');
const util = require('./utility');

class ML {
    createDataset = async (data, callback) => {
        let fightList = await db.getAllFights();
        let rawDataset = await util.rawDataset(fightList, callback, { shuffle: true, format: data.type, dataset: true });
        let results = await ml.createDataset(rawDataset, { ...data });
        await db.saveDataset({ ...data, ...{ results } });
    }

    train = async (data, callback) => {
        let results = await ml.train(data, callback);
        await db.saveModel({ ...data, ...{ results } });
    }

    predict = async (data, callback) => {
        let predictData = await db.getDraft();
        let rawDataset = await util.rawDataset(predictData.fights, callback, { format: 'wl', plain: true });

        let test = await ml.prediction(rawDataset);
        console.log('prediction', test)
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