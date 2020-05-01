const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const util = require('../../utility');
const db = require('../../../db');
const model = require('../model');

class Predict {
    constructor() {
        this.list = {};
    }

    draft = async (req, send) => {
        // Trained model
        const trained = await model.get(req.body.model);

        // Get draft
        const draft = await db.models.Draft.findOne();

        // Convert draft to raw data
        let set = await util.dataset.constractRawDataset({ list: draft.fights });
        let dataset = await util.convert.convert3d(set);

        //
        const dataset3d = tf.tensor3d(dataset.dataset);
        const predict = await trained.predict([dataset3d]).array();

        let list = {};
        for (let each in predict) {
            for (let i = 0; i < 2; i++) {
                let fighter = dataset.name[each][i][0];
                let predicted = predict[each][i];

                let isWin = predicted[1] > predict[each][Math.abs(i - 1)][1];

                list[fighter] = {
                    win: predicted[1],
                    loss: predicted[0],
                    outcome: isWin ? 'Win' : 'Loss'
                };
            }
        }

        for (let fights in draft.fights) {
            let fight = draft.fights[fights];

            for (let i = 1; i < 3; i++) {
                let fighter = `fighter${i}`;
                fight[fighter].predict = list[fight[fighter].name];
            }
        }

        send({ draft: draft });
    }
}

module.exports = new Predict;