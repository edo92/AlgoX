const StageTwo = require('./stageTwo');
const db = require('../DB');

class StageOne extends StageTwo {
    constructor() {
        super();

        this.fightList = [];

        this.stageOne = async eventList => {
            await eventList.map(async event => {
                await event.fights.map(fight => {
                    this.fightList.push(fight);
                })
            })

            // Map Each fight constract object with two fightes
            let withStats = await this.fightList.map(async (fight, index) => {
                // fight get personal stats for both fighters in each fight
                let f1 = await db.db.Fighter.findOne({ fighterId: fight.fighter1.fighterId });
                let f2 = await db.db.Fighter.findOne({ fighterId: fight.fighter2.fighterId });

                // Constract new fight object
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
            // Parse data
            Promise.all(withStats).then(res => {
                this.stageTwo(res);
            })
        }
    }
}

module.exports = StageOne;