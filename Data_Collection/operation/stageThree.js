const mine = require('../mine');
const db = require('../../DB');

class stageThree {
    constructor() {
        this.state = {};
    }

    start = async () => {
        // Get all evenets
        let eventList = await db.actions.getEvents();

        eventList.map(async event => {
            setTimeout(async () => { // Delay
                // Map Fights for each event
                await event.fights.map(async (fight, index) => {
                    this.list = await db.actions.findEvent(event._id);

                    // Collect fight states
                    this.getFightStats(fight, event._id, index);
                    this.state.total = (this.state.total || 0) + 1;
                });
            }, 1000);
        })
    }

    getFightStats = async (fight, eventId, index) => {
        if (!fight.fighter1.stats && !fight.fighter2.stats) {
            // Mine Fight stats for each fight. Return fighter1 & fighter2
            mine.fightStats(fight.statUrl, async data => {
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

                    let updated = await { ...this.list.fights[index], ...stats };
                    this.list.fights[index] = await updated;

                    // Save Stats to its specific fight index
                    db.actions.saveFightStats(eventId, await this.list);

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

    monitoreState = () => {
        console.log('-------------- Stage Three --------------');
        console.log(this.state);
        console.log('-----------------------------------------');
    }
}

module.exports = stageThree;