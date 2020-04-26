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
        const draft = await db.models.Draft.find();

        // // Convert draft to raw data
        let fights = await util.pipline.calculateFightAverage({ list: draft });
        let format3d = await util.custome.dataset(fights, {});
        const dataset = await util.convert.convert3d(format3d, { shuffle: true });

        
        // Tensor
        let fightList = draft[0].fights;
        for (let eachFight in fightList) {
            let fight = fightList[eachFight];

            let set = dataset.dataset[eachFight];
            const dataset3d = tf.tensor3d([set]);
            const predicted = await trained.predict([dataset3d]).array();

            let firstOne = predicted[0][0][0];
            let firstTwo = predicted[0][1][0];

            if (!this.list[fight.fighter1.name]) {
                this.list[fight.fighter1.name] = {};
                this.list[fight.fighter2.name] = {};
            }

            if (firstOne < firstTwo) {
                this.list[fight.fighter1.name] = 'win';
                this.list[fight.fighter2.name] = 'loss';
            }
            else if (firstOne > firstTwo) {
                this.list[fight.fighter1.name] = 'loss';
                this.list[fight.fighter2.name] = 'win';
            }
        }

        draft[0].fights.map(fight => {
            ['fighter1', 'fighter2'].map(fighter => {
                fight[fighter].predict = this.list[fight[fighter].name];
            })
        })

        send({ draft: draft[0] });
    }
}

module.exports = new Predict;