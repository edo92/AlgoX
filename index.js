const db = require('./DB');
const util = require('./utility');

const ml = require('./ML');

class ControlPanel {
    analize = async () => {
        ml.analitic();
    }

    train = () => {
        ml.train();
    }

    predict = async () => {
        db.connect();
        let fightList = await db.actions.getUpcomeFights();
        let rawDataset = await util.rawDataset(fightList, { format: 'wl' });

        let output = await ml.prediction(rawDataset.dataset);

        output.map(prediction => {
            let firstOne = prediction[0][0];
            let firstTwo = prediction[1][0];
            let result = null;

            if (firstOne < firstTwo) {
                result = { firstWin: true }
            }
            if (firstOne > firstTwo) {
                result = { secondWin: true }
            }
        })
    }

    createDataset = async () => {
        db.connect();
        // get fight list
        let fightList = await db.actions.getAllFights();
        // console.log('fightList', fightList);

        // pass event(s) get back each fighter data in raw
        let rawDataset = await util.rawDataset(fightList, { format: 'wl' });

        // create dataset and save
        ml.createDataset(rawDataset, 'wl');
    }
}

let control = new ControlPanel;
control.predict();