const tf = require('@tensorflow/tfjs');
require("@tensorflow/tfjs-node");

class Predict {
    predictSet = async (model, rawDataset, predictData) => {
        const predict = tf.tensor3d(rawDataset.dataset);
        let predicted = await model.predict([predict]).array();
        let list = {};

        predicted.map((each, index) => {
            let firstOne = each[0][0];
            let firstTwo = each[1][0];

            if (firstOne < firstTwo) {
                list[rawDataset.outcome[index][0]] = { win: firstOne };
                list[rawDataset.outcome[index][1]] = { loss: firstTwo };
            }
            else {
                list[rawDataset.outcome[index][0]] = { loss: firstOne };
                list[rawDataset.outcome[index][1]] = { win: firstTwo };
            }
        })

        predictData.fights.map(each => {
            ['fighter1', 'fighter2'].map(fighter => {
                each[fighter].result = list[each[fighter].name];
            })
        })

        return predictData.fights;
    }
}

module.exports = new Predict;