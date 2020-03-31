const mine = require('../mine');
const db = require('../../DB');

class StageFour {
    constructor() {
        this.stageFour = async () => {
            let eventList = await db.actions.getEvents();

            // eventList.map(event => {
            let event = eventList[0];
            event.event.fights.map((fight, index) => {
                let fighter1 = fight.fighter1;
                let fighter2 = fight.fighter2;
                this.getFighterStats(fighter1, event, index);
            })
            // })
        }
    }
    
    getFighterStats(fighter, event, index) {
        let url = fighter.fighterUrl;
        mine.getFighterStats(url, async stats => {
            if (stats.success) {
                let data = await db.actions.saveFighterStats(fighter, stats.success);
                // let savedId = data._id;
            }
            else {
                this.getFighterStats(url, index);
            }
        })
    }
}

module.exports = new StageFour;