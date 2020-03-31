const mine = require('../mine');
const db = require('../../DB');

class StageFour {
    constructor() {
        this.stageFour = async () => {
            let eventList = await db.actions.getEvents();

            eventList.map(event => {
                event.fights.map((fight, index) => {
                    ['fighter1', 'fighter2'].map(fighter => {
                        this.getFighterStats(fight[fighter], fighter, event, index);
                    });
                })
            })
        }
    }

    getFighterStats(ftrData, which, event, index) {
        let fighter = Object.assign({}, ftrData);

        let url = fighter.fighterUrl;

        if (!fighter.fighterId) {
            mine.getFighterStats(url, async stats => {
                if (stats.success) {
                    // Create document for fighter info
                    db.actions.saveFighterStats(fighter, stats.success, async data => {
                        // Link created id to fighter in fightList
                        fighter.fighterId = data._id;

                        console.log('getting fighter:', fighter.name);

                        // Saved linked fight index
                        if (data._id)
                            await db.actions.saveStatId(event, fighter, which, index);
                    });
                } else {
                    this.getFighterStats(fighter, which, event, index);
                }
            })
        }
    }
}

module.exports = new StageFour;