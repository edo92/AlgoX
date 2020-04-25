const Constract = require('./construct');

class StageOne extends Constract {
    constructor() {
        super()

        this.countables = {};
        this.fighterStats = {};
    }

    allFightersObject = (events, fighterInfo) => {
        // Gether all fights
        let fightList = [];
        for (let eachEvent in events) {
            let event = events[eachEvent];
            for (let eachFight in event.fights) {
                let fight = event.fights[eachFight];
                // Push, constract fight object with only necc. data
                fightList.push({
                    method: fight.method,
                    fighter1: {
                        name: fight.fighter1.name,
                        id: fight.fighter1.fighterId,
                        outcome: fight.fighter1.outcome,
                        ...{ stats: this.constractPerfomStats(fight.fighter1.stats) }
                    },
                    fighter2: {
                        name: fight.fighter2.name,
                        id: fight.fighter2.fighterId,
                        outcome: fight.fighter2.outcome,
                        ...{ stats: this.constractPerfomStats(fight.fighter2.stats) }
                    }
                });
            }
        }

        // Count each fighters performace statistic
        for (let fights in fightList) {
            let fight = fightList[fights];

            // Map fighter1 and fighter2
            for (let i = 1; i < 3; i++) {
                let fighter = fight[`fighter${i}`];

                if (!this.countables[fighter.id]) {
                    this.countables[fighter.id] = {};
                    this.countables[fighter.id].fights = 0;
                }

                // Count how many times fighter exists
                this.countables[fighter.id].fights += 1;

                // Map fighter stats object keys
                for (let key in fighter.stats) {
                    let datapoint = fighter.stats[key];

                    if (typeof datapoint === 'number') {
                        if (!this.countables[fighter.id][key]) {
                            this.countables[fighter.id][key] = 0;
                        }
                        this.countables[fighter.id][key] += datapoint;
                    }
                }
            }
        }

        // Devide countable average
        for (let eachFgtr in this.countables) {
            let fighter = this.countables[eachFgtr];

            for (let data in fighter) {
                let datapoint = fighter[data];
                if (data !== 'fights', data !== 'kd', data !== 'pass', data !== 'rev') {
                    datapoint = fighter[data] / fighter.fights;
                }
            }
        }

        // Create fighter list object
        for (let fighters in fighterInfo) {
            let fighter = fighterInfo[fighters];
            let rawStats = this.constractFighterInfo(fighter.stats);
            this.fighterStats[fighter.fighterId] = rawStats;
        }

        for (let eachFgtr in this.countables) {
            this.countables[eachFgtr] = {
                ...this.countables[eachFgtr],
                ...this.fighterStats[eachFgtr]
            }
        }

        return this.countables;
    }
}

module.exports = StageOne;