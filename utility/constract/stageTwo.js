class StageTwo {
    constructor() {
        this.allEvents = [];
        this.countables = {};
    }

    stageTwo = async envFtrs => {
        this.allEvents = await this.db.Events.find();

        for (let fighter in envFtrs) {
            let { fighterId } = envFtrs[fighter];
            // Create fighter name object in countables
            !this.countables[fighterId] && (this.countables[fighterId] = {});
        }

        for (let event in this.allEvents) {
            let thisEvent = this.allEvents[event];

            // Map each fight in all events
            for (let fight in thisEvent.fights) {
                let thisFight = thisEvent.fights[fight];

                // Each fighter in the fight
                ['fighter1', 'fighter2'].map(each => {
                    let fighter = thisFight[each];

                    if (this.countables[fighter.fighterId]) {

                        let rawData = this.performaceRawData(fighter.stats);

                        Object.keys(rawData).map(key => {
                            let data = rawData[key];

                            if (!this.countables[fighter.fighterId][key]) {
                                this.countables[fighter.fighterId][key] = 0;
                                this.countables[fighter.fighterId].count = 0;
                            }

                            this.countables[fighter.fighterId][key] += data;
                            this.countables[fighter.fighterId].count += 1;
                        })
                    }
                })
            }
        }

        for (let stats in this.countables) {
            const count = this.countables[stats].count;

            for (let data in this.countables[stats]) {
                if (data !== 'count' && data !== 'kd' && data !== 'rev' &&
                    data !== 'sigStr' && data !== 'takeDown' &&
                    data !== 'subAtt' && data !== 'pass'
                ) {
                    this.countables[stats][data] = this.countables[stats][data] / count;
                }
            }
            delete this.countables[stats].count;
        }

        for (let fighter in this.countables) {
            let profile = await this.db.Fighter.findOne({ fighterId: fighter });
            delete profile.stats.pastFights;

            let rawData = this.getRawData(profile.stats);

            this.countables[fighter] = { ...this.countables[fighter], ...rawData };
        }

        this.eventFighters = [];

        return this.countables;
    }

    getRawData = stats => {
        return {
            strAcc: Number(stats.StrAcc.split('%')[0]),
            strDef: Number(stats.StrDef.split('%')[0]),
            strDef: Number(stats.TDDef.split('%')[0]),
            tdAcc: Number(stats.TDAcc.split('%')[0]),

            age: new Date().getFullYear() - Number(stats.dob.split(', ')[1]),
            hight: Number(`${stats.hight.split("'")[0]}.${stats.hight.split("'")[1].split('"')[0].trim()}`),
            // Mes.
            weight: Number(stats.weight.split(' ')[0]),
            reach: Number(stats.reach.split('"')[0]),
        }
    }

    performaceRawData = stats => {
        return {
            sigStr: Number(stats.strSigPers.split('%')[0]),
            // Take down
            takeDown: Number(stats.takeDownPers.split('%')[0]),
            // Submission
            subAtt: Number(stats.subAtt),
            pass: Number(stats.pass),
            rev: Number(stats.rev),

            kd: Number(stats.kd),
            // Strick
            sigStrTotal: Number(stats.strSig.split(' of ')[1]),
            sigStrLanded: Number(stats.strSig.split(' of ')[0]),
            // Head
            strHeadLanded: Number(stats.strHead.split(' of ')[0]),
            strHeadTotal: Number(stats.strHead.split(' of ')[1]),
            // Body
            strBodyLanded: Number(stats.strBody.split(' of ')[0]),
            strBodyTotal: Number(stats.strBody.split(' of ')[1]),
            // Leg
            strLegLanded: Number(stats.strLeg.split(' of ')[0]),
            strLegTotal: Number(stats.strLeg.split(' of ')[1]),
            // Distance
            distanceSucc: Number(stats.distance.split(' of ')[0]),
            distanceTotal: Number(stats.distance.split(' of ')[1]),
            // Takedown
            tdSucc: Number(stats.takeDown.split(' of ')[0]),
            tdTotal: Number(stats.takeDown.split(' of ')[1]),
        }
    }
}
module.exports = StageTwo;