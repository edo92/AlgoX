const db = require('./DB');
const util = require('./utility');

const ml = require('./ML');

class ControlPanel {
    // predict = () => {
    //     ml.predict();
    // }

    analize = () => {
        ml.analitic();
    }

    train = () => {
        ml.train();
    }

    createDataset = async () => {
        db.connect();
        // get fight list
        let fightList = await db.actions.getAllFights();
        // make raw with util lib
        let rawDataset = await util.rawDataset(fightList);
        // create dataset and save
        ml.createDataset(rawDataset, { save: true });
    }
}

let control = new ControlPanel;
control.analize();