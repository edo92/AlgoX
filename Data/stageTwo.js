const StageThree = require('./stageThree');

class StageTwo extends StageThree {
    constructor() {
        super();

        this.stageTwo = async eventList => {
            // Map new constracted list
            let combineList = await eventList.map(event => {
                let { fighter1, fighter2 } = event;

                return { // Combine each fighter [outcome, stats, fighterStats]
                    fighter1: { outcome: fighter1.outcome, ...fighter1.stats, ...fighter1.fighterStats },
                    fighter2: { outcome: fighter2.outcome, ...fighter2.stats, ...fighter2.fighterStats }
                }
            })
            // Constract new object
            return await this.constractObject(combineList);
        }
    }

    constractObject = async fights => {
        let list = [];

        for (let eachF in fights) {
            // Each fight
            let fight = fights[eachF];

            // Constract fighter object
            let constracted = {};

            for (let each in fight) {
                // Each fighter in a fight
                let fighter = fight[each];

                constracted[each] = {
                    // method: fight.method,

                    // //-->  // fighter and outcome
                    name: fighter.name,
                    outcome: fighter.outcome,
                    // stats
                    age: new Date().getFullYear() - Number(fighter.dob.split(', ')[1]),
                    hight: Number(`${fighter.hight.split("'")[0]}${fighter.hight.split("'")[1].split('"')[0].trim()}`),
                    // Mes.
                    weight: Number(fighter.weight.split(' ')[0]),
                    reach: Number(fighter.reach.split('"')[0]),

                    //--->    // strick
                    sigStr: Number(fighter.strSigPers.split('%')[0]),
                    strAcc: Number(fighter.StrAcc.split('%')[0]),
                    strDef: Number(fighter.StrDef.split('%')[0]),

                    // Take down
                    takeDown: Number(fighter.takeDownPers.split('%')[0]),
                    strDef: Number(fighter.TDDef.split('%')[0]),
                    tdAcc: Number(fighter.TDAcc.split('%')[0]),

                    // Submission
                    subAtt: Number(fighter.subAtt),
                    pass: Number(fighter.pass),
                    rev: Number(fighter.rev),


                    countable: {
                        // KO
                        kd: Number(fighter.kd),
                        // Strick
                        sigStrTotal: Number(fighter.strSig.split(' of ')[1]),
                        sigStrLanded: Number(fighter.strSig.split(' of ')[0]),
                        // Head
                        strHeadLanded: Number(fighter.strHead.split(' of ')[0]),
                        strHeadTotal: Number(fighter.strHead.split(' of ')[1]),
                        // Body
                        strBodyLanded: Number(fighter.strBody.split(' of ')[0]),
                        strBodyTotal: Number(fighter.strBody.split(' of ')[1]),
                        // Leg
                        strLegLanded: Number(fighter.strLeg.split(' of ')[0]),
                        strLegTotal: Number(fighter.strLeg.split(' of ')[1]),
                        // Distance
                        distanceSucc: Number(fighter.distance.split(' of ')[0]),
                        distanceTotal: Number(fighter.distance.split(' of ')[1]),
                        // Takedown
                        tdSucc: Number(fighter.takeDown.split(' of ')[0]),
                        tdTotal: Number(fighter.takeDown.split(' of ')[1]),
                    },
                }
            }
            list.push(constracted);
        }
        return this.stageThree(list);
    }
}
module.exports = StageTwo;