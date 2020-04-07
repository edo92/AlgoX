const StageThree = require('./stageThree');

class StageTwo extends StageThree {
    constructor() {
        super();

        this.stageTwo = async eventList => {
            let combineList = await eventList.map(event => {
                return {
                    fighter1: { ...event.fighter1.stats, ...event.fighter1.fighterStats, },
                    fighter2: { ...event.fighter1.stats, ...event.fighter2.fighterStats }
                }
            })
            return this.constractObject(combineList);
        }
    }

    constractObject = async fights => {
        let list = [];
        await fights.map(fight => {
            let constracted = {};

            ['fighter1', 'fighter2'].map(each => {
                let fighter = fight[each];
                constracted[each] = {

                    // ===== Test options
                    name: fighter.name,
                    outcome: fighter.outcome,
                    //========


                    // stats
                    age: new Date().getFullYear() - Number(fighter.dob.split(', ')[1]),
                    hight: fighter.height,
                    // fighter.hight.split("'")[0] + '.'.fighter.hight.split('"')[0]
                    weight: Number(fighter.weight.split(' ')[0]),
                    reach: fighter.reach.split('"')[0],

                    // strick
                    sigStr: Number(fighter.strSigPers.split('%')[0]),
                    strAcc: Number(fighter.StrAcc.split('%')[0]),
                    strDef: Number(fighter.StrDef.split('%')[0]),
                    sigStrLanded: Number(fighter.strSig.split(' of ')[0]),
                    sigStrTotal: fighter.strSig.split(' of ')[1],


                    // points
                    kd: Number(fighter.kd),
                    //Head
                    strHeadLanded: Number(fighter.strHead.split(' of ')[0]),
                    strHeadTotal: Number(fighter.strHead.split(' of ')[1]),
                    //Body
                    strBodyLanded: Number(fighter.strBody.split(' of ')[0]),
                    strBodyTotal: Number(fighter.strBody.split(' of ')[1]),
                    //Leg
                    strLegLanded: fighter.strLeg.split(' of ')[0],
                    strLegTotal: fighter.strLeg.split(' of ')[1],


                    // Take down
                    takeDown: fighter.takeDownPers,
                    tDAcc: fighter.TDAcc,
                    strDef: fighter.TDDef,
                    tdCount: fighter.takeDown,

                    // Submission
                    subAtt: fighter.subAtt,
                    pass: fighter.pass,
                    rev: fighter.rev,
                    distance: fighter.distance,
                }
            })
            list.push(constracted);
        })
        return this.stageThree(list);
    }
}
module.exports = StageTwo;