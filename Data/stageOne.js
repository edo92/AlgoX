const StageTwo = require('./stageTwo');
const db = require('../DB');

// Gethering fighter stats fith fighter performance stats
class StageOne extends StageTwo {
    constructor() {
        super();

        this.fightList = [];

        this.stageOne = async eventList => {
            // Separate each fight from each event / to this.fightList
            await eventList.map(async event => {
                // Keep track of how meny events has been scaned
                this.registerLogs('events');

                await event.fights.map(fight => {
                    // Keep track of how meny fights has been scaned
                    this.registerLogs('fights');
                    // Seaparate each fight to this fightList
                    this.fightList.push(fight);
                })
            })

            // Map Each fight constract object with two fightes
            let withStats = await this.fightList.map(async (fight, index) => {
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