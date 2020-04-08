const db = require('../DB');
const Validation = require('./validation');

class QualityCheck extends Validation {
    constructor() {
        super();

        this.fightsList = [];
        this.fighterList = [];
    }

    QualityCheck = async () => {
        let events = await db.actions.getEvents();

        this.analizeEvents(events);
        this.analizeFights();

        let fighters = await db.actions.getFighters();
        this.analizeFighters(fighters);
    }

    analizeEvents = eventList => {
        for (let eachEvent in eventList) {
            this.registerLog('events');

            let event = eventList[eachEvent];

            this.eventValidation(event);

            for (let eachFight in event.fights) {
                this.registerLog('fights');

                let fight = event.fights[eachFight];

                this.fightValidation(fight);

                this.fightsList.push(fight);
            }
        }
    }

    analizeFights = () => {
        for (let fight in this.fightsList) {
            ['fighter1', 'fighter2'].map(eachFighter => {
                // fighters count
                this.registerLog('fighters');

                // Each fighter from each fight 
                let fighter = this.fightsList[fight][eachFighter];

                // Validate fighter data
                this.fighterValidation(fighter);

                // Validate fighter stats
                this.statsValidation(fighter.stats);

                // Separate each fighter 
                this.fighterList.push(fighter);
            })
        }
    }

    analizeFighters = fighters => {
        for (let each in fighters) {
            this.fighterStatsValidation(fighters[each]);
            this.registerLog('registered');
        }
    }
}

module.exports = QualityCheck;