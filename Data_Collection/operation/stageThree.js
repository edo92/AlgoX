const mine = require('../mine');
const db = require('../../DB');

class stageThree {
    constructor() {
        this.state = {};
    }

    start = async () => {
        // Get all evenets
        let eventList = await db.actions.getEvents();

        eventList.map(event => {
            setTimeout(async () => { // Delay
                // Map Fights for each event
                await event.fights.map((fight, index) => {
                    

                    // Collect fight states
                    this.getFightStats(fight, event._id, index);
                });
            }, 1000);
        })
    }

    monitoreState = () => {
        console.log('-------------- Stage Three --------------');
        console.log(this.state);
        console.log('-----------------------------------------');
    }

    getFightStats = (fight, eventId, index) => {
        // Collect stats if stats are missing
        if (!fight.fighter1.stats && !fight.fighter2.stats) {
            
            // Count each fight
            this.state.total = (this.state.total || 0) + 1;

            // Mine Fight stats for each fight. Return fighter1 & fighter2
            mine.fightStats(fight.statUrl, data => {
                // Match fighter with stats by name save in fight
                if (data.success) {
                    let stats = {
                        fighter1: {
                            ...fight.fighter1, ...{
                                stats:
                                    data.success.fighter_1.name === fight.fighter1.name ? data.success.fighter_1 : data.success.fighter_2
                            }
                        },
                        fighter2: {
                            ...fight.fighter2, ...{
                                stats:
                                    data.success.fighter_2.name === fight.fighter2.name ? data.success.fighter_2 : data.success.fighter_1
                            }
                        },
                    }
                    // Save Stats to its specific fight index
                    db.actions.saveFightStats(eventId, index, stats);

                    // Increment collected
                    this.state.collected = (this.state.collected || 0) + 1;

                    // Monitor progress
                    this.monitoreState();
                }
                else {
                    this.getFightStats(fight, eventId, index);
                }
            });
        }
    }
}

module.exports = stageThree;