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

    predict = async () => {
        db.connect();
        let fightList = await db.actions.getUpcomeFights();
        let rawDataset = await util.rawDataset(fightList);
        // console.log('rawDataset', rawDataset)
    }

    createDataset = async () => {
        db.connect();
        // get fight list
        let fightList = await db.actions.getAllFights();
        // console.log('fightList', fightList);

        // make raw with util lib
        let rawDataset = await util.rawDataset(fightList);
        // create dataset and save
        ml.createDataset(rawDataset, { save: true });
    }

    test = async () => {
        db.connect();
        //
        let upcome = await db.actions.getUpcomeFights();

        // let past = await db.actions.getAllFights();

        let rawDataset = await util.rawDataset(upcome);
    }
}

let control = new ControlPanel;
control.test();