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
        let dataModel = await models.getDataModel('wl');

        for (let i in dataModel.outcome) {
            let prediction = await predict.predict(model, [dataModel.trainData[i]]);
            let outcome = dataModel.outcome[i];

            let firstOne = prediction[0][0][0];
            let firstTwo = prediction[0][1][0];
            let firstWin = outcome[0][0] === 1;

            let result = null;
            if (firstWin) {
                if (firstOne < firstTwo) {
                    result = true
                }
                else {
                    result = false
                }
            }
            else {
                if (firstOne > firstTwo) {
                    result = true
                }
                else {
                    result = false
                }
            }

            console.log('----------------------')
            console.log('outcome', outcome)
            console.log('prediction', prediction)
            console.log('is Correct', result)
            console.log('======================')
        }
    }
}

module.exports = new DeepLearning;