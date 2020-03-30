const mine = require('../mine');
const db = require('../../DB');

class StageFour {
    constructor() {
        this.stageFour = async () => {
            let eventList = await db.actions.getEvents();

            eventList.map(event => {
                event.event.fights.map(fight => {
                    let fighter1 = fight.fighter1;
                    let fighter2 = fight.fighter2;

                    
                })
            })
        }
    }
}

module.exports = new StageFour;