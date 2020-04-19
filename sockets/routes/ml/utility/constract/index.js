const StageTwo = require('./constract');
const db = require('../../db');

// Fighter's fight performense through history avg.
class StageOne extends StageTwo {
    constructor() {
        super();

        this.db = db;
        this.config = {};
        this.eventFighters = [];
        this.progress = 1;
    }

    rawDataset = async (fightList, cbAction, config) => {
        this.config = config;

        this.allEvents = await db.getEvents();

        const action = () => {
            let point = (fightList.length - 1) * (1 / 300);
            cbAction({ dataset: { progress: this.progress += point } });
        }

        for (let fight in fightList) {
            ['fighter1', 'fighter2'].map(each => {
                action();
                let { name, fighterId } = fightList[fight][each];
                this.eventFighters.push({ fighterId, name });
            })
        }

        let stats = await this.stageTwo(this.eventFighters, action);

        let readyList = fightList.map(fight => {
            return ['fighter1', 'fighter2'].map(each => {
                action()
                let { name, fighterId, outcome } = fight[each];
                let data = { stats: stats[fighterId], outcome };
                return { ...data, name, fighterId };
            })
        })

        const radyRawData = await this.stageThree(readyList, action);
        cbAction({ dataset: { creating: false, progress: 0 } });

        return radyRawData;
    }
}

module.exports = new StageOne;