const StageOne = require('./stageOne');

class DataGethering extends StageOne {
    constructor() {
        super();

        this.state = {};

        this.rawDataset = async list => {
            return await this.stageOne(list);
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