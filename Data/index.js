const StageOne = require('./stageOne');
const db = require('../DB');

class DataGethering extends StageOne {
    constructor() {
        super();

        this.state = {};

        this.getRawData = async () => {
            let eventList = await db.db.Events.find()
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