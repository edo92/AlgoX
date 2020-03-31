const mine = require('../mine');
const db = require('../../DB');

class stageThree {
    constructor() {
        this.stageThree = async () => {
            let eventList = await db.actions.getEvents();

            // eventList.map(event => {
            let event = eventList[0];
            setTimeout(async () => {
                await event.fights.map((fight, index) => {
                    let eventId = event._id;
                    this.getFightStats(fight, eventId, index);
                });
            }, 1000);
            // })
        }

        this.getFightStats = (fight, eventId, index) => {
            if (!fight.fighter1.stats && !fight.fighter2.stats) {
                mine.fightStats(fight.statUrl, data => {
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
                        console.log(fight.fighter1.name)
                        db.actions.saveFightStats(eventId, index, stats);
                    }
                    else {
                        this.getFightStats(fight, eventId, index);
                    }
                });
            }
        }
    }
}

module.exports = new stageThree;