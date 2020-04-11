const data = require('../Data');

const models = require('./models');
const train = require('./train');
const predict = require('./predict');

class DeepLearning {
    createModel = async () => {
        let rawData = await data.getRawData();
        models.createWL(rawData);
    }

    train = async () => {
        let trainData = await models.getModel('wl');
        train.trainData(trainData, 'wl');
    }

    predict = async () => {
        let model = await train.getTrainedModel('wl');
        let dataXX = [[[33,61,185,77,35,43,46,0,43,0,0,0,202,72,56,185,13,14,3,3,71,201,1,0],[33,61,205,75,35,45,76,0,40,0,0,0,97,38,21,74,7,11,10,12,33,91,0,1]]]
        predict.predict(model, dataXX);
    }
}

module.exports = new DeepLearning;