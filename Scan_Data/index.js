const db = require('../DB');
const DataQualityCheck = require('./dataQualityCheck');

class ScanData extends DataQualityCheck {
    constructor() {
        super();
        this.state = {};
    }

    start = async () => {
        db.connect();

        let events = await db.actions.getEvents();

        this.QualityCheck(events);
    }

    registerLog = (key) => {
        this.state[key] = (this.state[key] || 0) + 1;
        this.monitorProgress();
    }

    monitorProgress = () => {
        console.log(this.state);
    }
}

let analize = new ScanData;
analize.start();