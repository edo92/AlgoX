const mine = require('../mine');
const db = require('../db');

class stageThree {
    constructor() {
        this.stageThree = async () => {
            let eventList = await db.actions.getEvents();

            eventList.map(event => {
                setTimeout(async () => {
                    await event.event.fights.map((fight, index) => {
                        let eventId = event._id;
                        this.getFightStats(fight, eventId, index);
                    });
                }, 1000);
            })
        }

        this.getFightStats = (fight, eventId, index) => {
            mine.fightStats(fight.statUrl, data => {
                if (data.success) {
                    let stats = {
                        fighter1: { ...fight.fighter1, ...{ stats: data.success.fighter_1 } },
                        fighter2: { ...fight.fighter2, ...{ stats: data.success.fighter_2 } },
                    }

                    db.actions.saveFightStats(eventId, index, stats);
                }
                else {
                    this.getFightStats(fight, eventId, index);
                }
            });
        }
    }
}

module.exports = new stageThree;