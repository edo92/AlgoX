const StageTwo = require('./constract');
const db = require('../../DB');

// Fighter's fight performense through history avg.
class StageOne extends StageTwo {
    constructor() {
        super();

        this.db = db.db;
        this.options = {};
        this.eventFighters = [];
    }

    rawDataset = async (fightList, config) => {
        this.config = config;

        this.allEvents = await this.db.Events.find();

        for (let fight in fightList) {
            ['fighter1', 'fighter2'].map(each => {
                let { name, fighterId } = fightList[fight][each];
                this.eventFighters.push({ fighterId, name });
            })
        }

        let stats = await this.stageTwo(this.eventFighters);

        let readyList = fightList.map(fight => {
            return ['fighter1', 'fighter2'].map(each => {
                let { name, fighterId, outcome } = fight[each];
                let data = { stats: stats[fighterId], outcome };
                return { ...data, name, fighterId };
            })
        })
        
        return await this.stageThree(readyList);
    }
}

module.exports = new StageOne;