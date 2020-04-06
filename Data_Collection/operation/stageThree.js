const mine = require('../mine');
const db = require('../../DB');

class stageThree {
    constructor() {
        this.state = {};
        this.eventList = {};
        this.fightList = [];
    }

    start = async () => {
        // Get all evenets
        this.eventList = await db.actions.getEvents();

        // Separate event fights in one this.fighterList arr
        await this.eventList.map(async event => {
            await event.fights.map(fight => {
                fight.id = event._id;
                this.fightList.push(fight);
            })
        })

        // Mine function mutates this.fighterList
        const mineStats = (fight, index) => {
            mine.fightStats(fight.statUrl, async data => {
                if (data.success) {
                    this.state.collected = (this.state.collected || 0) + 1;

                    this.monitorProgress();

                    await db.db.Events.updateOne(
                        {
                            _id: fight.id,
                            'fights.statUrl': fight.statUrl,
                        },
                        {
                            $set: {
                                'fights.$.fighter1': {
                                    ...this.fightList[index].fighter1, ...{ stats: data.success.fighter1 }
                                },
                                'fights.$.fighter2': {
                                    ...this.fightList[index].fighter2, ...{ stats: data.success.fighter2 }
                                }
                            }
                        }
                    )
                }
                else {
                    mineStats(fight, index);
                }
            })
        }

        // Map each fight and mine stats for each fighter
        this.fightList.map((fight, index) => {
            // Count fighter total
            this.state.total = (this.state.total || 0) + 1;
            // Delay 2s mining stats
            setTimeout(() => { mineStats(fight, index) }, 2000);
        })
    }

    monitorProgress = () => {
        console.log('Progress', this.state)
    }
}

module.exports = stageThree;