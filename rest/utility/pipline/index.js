
const StageOne = require('./rawData');
const db = require('../../../db');

class Pipline extends StageOne {
    constructor() {
        super();
    }

    calculateFightAverage = async config => {
        // Get all events from db
        let events = await db.models.Events.find();
        let fighters = await db.models.Fighters.find();

        let fighterObject = await this.allFightersObject(events, fighters);

        return mergeStats(config.all ? events : config.list);
        // Analize Data

        async function mergeStats(eventList) {
            let events = eventList;
            let fightList = [];

            for (let eachEvent in events) {
                let event = events[eachEvent];

                for (let fights in event.fights) {
                    let fight = event.fights[fights];
                    fightList.push(fight);
                }
            }

            for (let fights in fightList) {
                let fight = fightList[fights];

                for (let i = 1; i < 3; i++) {
                    let fighter = fight[`fighter${i}`];
                    fight[`fighter${i}`].stats = fighterObject[fighter.fighterId];
                }
            }

            return fightList;
        }

        // Validat data
        // validation.validate(events);
    }
}

module.exports = new Pipline;