const Validation = require('./validation');

class QualityCheck extends Validation {
    constructor() {
        super();
    }

    QualityCheck = eventList => {
        
        let fightsList = [];
        for (let eachEvent in eventList) {
            this.registerLog('events');

            let event = eventList[eachEvent];

            this.eventValidation(event);

            for (let eachFight in event.fights) {
                this.registerLog('fights');

                let fight = event.fights[eachFight];

                this.fightValidation(fight);

                fightsList.push(fight);
            }
        }

        let fighterList = [];
        for (let fight in fightsList) {
            ['fighter1', 'fighter2'].map(eachFighter => {
                // fighters count
                this.registerLog('fighters');

                // Each fighter from each fight 
                let fighter = fightsList[fight][eachFighter];

                // Validate fighter data
                this.fighterValidation(fighter);

                // Validate fighter stats
                this.statsValidation(fighter.stats);

                // Separate each fighter 
                fighterList.push(fighter);
            })
        }
    }
}

module.exports = QualityCheck;