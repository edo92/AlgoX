const StageOne = require('./stageOne');
const db = require('../DB');

class DataGethering extends StageOne {
    constructor() {
        super();

        this.start = async () => {
            let eventList = await db.actions.getEvents();

            this.stageOne(eventList);
        }
    }
}

module.exports = new DataGethering;