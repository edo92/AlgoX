const StageTwo = require('./stageTwo');
const db = require('../DB');

class StageOne extends StageTwo {
    constructor() {
        super();

        this.state = {};
        this.fightList = [];

        this.stageOne = async eventList => {
            await eventList.map(async event => {
                await event.fights.map(fight => {
                    this.fightList.push(fight);
                })
            })

            let withStats = await this.fightList.map(async (fight, index) => {
                let f1 = await db.db.Fighter.findOne({ fighterId: fight.fighter1.fighterId });
                let f2 = await db.db.Fighter.findOne({ fighterId: fight.fighter2.fighterId });

                return {
                    fighter1: {
                        ...this.fightList[index].fighter1,
                        fighterStats: f1.stats
                    },
                    fighter2: {
                        ...this.fightList[index].fighter2,
                        fighterStats: f2.stats
                    }
                }
            })

            Promise.all(withStats).then(res => {
                this.stageTwo(res);
            })
        }
    }
}

module.exports = StageOne;