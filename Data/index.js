const StageOne = require('./stageOne');
const db = require('../DB');

class DataGethering extends StageOne {
    constructor() {
        super();

        this.state = {};

        this.getTrainData = async () => {
            let eventList = await db.actions.getEvents();
            return await this.stageOne(eventList);
        }

        this.registerLogs = obj => {
            this.state[obj] = (this.state[obj] || 0) + 1;
        }

        this.monitorProgress = () => {
            console.log(this.state);
        }
    }
}

module.exports = new DataGethering;