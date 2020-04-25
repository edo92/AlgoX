const validation = require('./validate.json');

class ValidateData {
    constructor() {
        this.state = {
            eventErr: 0,
            fightErr: 0,
            fighterErr: 0,
            events: 0,
            fights: 0,
            fighters: 0
        };
    }



    validate = async eventList => {
        // Check event data
        let clearEvents = [];
        for (let eachEvent in eventList) {
            this.state.events += 1;

            let event = eventList[eachEvent];
            let isValid = 0;

            // Map each event keys
            for (let eachPoint in validation.event.points) {
                let data = validation.event.points[eachPoint];

                if (typeof event[eachPoint] === data.type) {
                    if (event[eachPoint].length) {
                        isValid += 1;
                    }
                } else {
                    this.state.eventErr += 1;
                }
            }

            if (isValid === validation.event.length) {
                clearEvents.push(event);
            }
        }

        // Separe fights
        let fightsList = [];
        for (let eachEvent in clearEvents) {
            let event = clearEvents[eachEvent];
            for (let fight in event.fights) {
                fightsList.push(event.fights[fight]);
            }
        }

        let validFights = []
        for (let eachFight in fightsList) {
            let fight = fightsList[eachFight];
            let isValid = 0;

            for (let eachPoint in validation.fight.points) {
                let data = validation.fight.points[eachPoint];
                if (typeof fight[eachPoint] === data.type) {
                    isValid += 1;
                }
                else {
                    this.state.fightErr += 1;
                }
            }

            if (isValid === validation.fight.length) {
                validFights.push(fight);
            }
        }

        let test = []
        for (let eachFight in validFights) {
            this.state.fights += 1;
            let fight = validFights[eachFight];
            let isValid = 0;
            let isValidStats = 0;

            for (let i = 1; i < 3; i++) {
                this.state.fighters += 1;
                let fighter = fight[`fighter${i}`];

                for (let eachPoint in validation.fighter.points) {
                    let data = validation.fighter.points[eachPoint];

                    if (typeof fighter[eachPoint] === data.type) {
                        isValid += 1;
                        // console.log('fighter[eachPoint]',fighter[eachPoint])
                    }
                    else {
                        console.log('errr')
                        // this.state.fighterErr += 1;
                    }
                }

                for (let eachStat in fighter.stats) {
                    let stat = fighter.stats[eachStat];
                    if (stat.length && typeof stat === 'string') {
                        isValidStats += 1;
                    }
                }
            }

            if (isValidStats > 32 && ((isValid / 2) === validation.fighter.length)) {
                test.push(fight);
            }
            else {
                this.state.fighterErr += 1;
            }
        }

        // Divide to get average %
        this.state.eventErr = 100 - ((this.state.eventErr / this.state.events) * 100);
        this.state.fightErr = 100 - ((this.state.fightErr / this.state.fights) * 100);
        this.state.fighterErr = 100 - ((this.state.fighterErr / this.state.fighters) * 100);

        return this.state;
    }
}

module.exports = ValidateData;