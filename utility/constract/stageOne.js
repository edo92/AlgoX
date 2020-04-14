const StageTwo = require('./stageTwo');
const db = require('../../DB');

// Gethering fighter stats fith fighter performance stats
class StageOne extends StageTwo {
    constructor() {
        super();

        this.fightList = [];

        this.stageOne = async list => {
            this.fightList = list;

            // Map Each fight constract object with two fightes
            let withStats = await list.map(async (fight, index) => {
                // fight get personal stats for both fighters in each fight
                let f1 = await db.db.Fighter.findOne({ fighterId: fight.fighter1.fighterId });
                let f2 = await db.db.Fighter.findOne({ fighterId: fight.fighter2.fighterId });

                this.registerLogs('fighters');
                this.registerLogs('fighters');

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
            return await Promise.all(withStats).then(async res => {
                this.monitorProgress();
                return await this.stageTwo(res);
            })
                .catch((err) => {
                    throw err
                    console.log('** Error Parsing data')
                })
        }
    }
}

module.exports = StageOne;