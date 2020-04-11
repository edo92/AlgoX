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
            // If fighter1 and fihter2 stats has been saved
            if (fight.fighter1.stats && fight.fighter2.stats) {
                this.state.message = 'Already exists';
                this.state.exists = (this.state.exists || 0) + 1;
                this.monitorProgress();
            }
            else {
                // Mine stats for each fighter in each fight
                mine.fightStats(fight.statUrl, async data => {
                    // Retry mining if error
                    if (!data.success) {
                        mineStats(fight, index);
                    }
                    else {
                        // Updated object for each fight
                        let saveData = {
                            stats: {
                                fighter1: {
                                    ...this.fightList[index].fighter1,
                                    ...({
                                        stats: this.fightList[index].fighter1.name ===
                                            data.success.fighter1.name ? data.success.fighter1 : data.success.fighter2
                                    })
                                },
                                fighter2: {
                                    ...this.fightList[index].fighter2,
                                    ...({
                                        stats: this.fightList[index].fighter2.name ===
                                            data.success.fighter2.name ? data.success.fighter2 : data.success.fighter1
                                    })
                                }
                            },
                            id: fight.id,
                            urlId: fight.statUrl,
                        };

                        // Save each events fighters performance stats
                        let saveStats = await db.actions.saveFightStats(saveData);

                        // Save message in state
                        this.state.message = saveStats.success;

                        // If successfule increment else retry saving data
                        if (saveStats.success) {
                            this.state.collected = (this.state.collected || 0) + 1;
                            // Monitor state
                            this.monitorProgress();
                        }
                        else {
                            // Retry saving data
                            let saveRetry = await db.actions.saveFightStats(fightStats);

                            // If retry is not successfull increment error
                            if (!saveRetry.success) {
                                this.state.error = (this.state.error || 0) + 1;
                            }
                        }
                    }
                })
            }
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
        console.log(this.state);
    }
}

module.exports = stageThree;