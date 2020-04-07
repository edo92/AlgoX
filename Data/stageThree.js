const StageFour = require('./stageFour');

class StageThree extends StageFour {
    constructor() {
        super();

        // Count countables
        this.stageThree = async fightList => {
            let list = {};

            await fightList.map(fight => {
                ['fighter1', 'fighter2'].map(async each => {
                    // Each fighter in the fight
                    let fighter = fight[each];

                    // Countable temp objects
                    if (!list[fighter.name]) {
                        list[[fighter.name]] = {
                            sigStrTotal: {}, sigStrLanded: {}, strHeadLanded: {},
                            strHeadTotal: {}, strBodyLanded: {}, strBodyTotal: {},
                            strLegLanded: {}, strLegTotal: {}, distanceLanded: {},
                            distanceTotal: {}, tdSucc: {}, tdTotal: {}, kd: {}
                        }
                    }

                    // Each fighter in the list
                    let ftrPerform = list[fighter.name]

                    // Add up all number, and count total sum
                    for (let key in ftrPerform) {
                        ftrPerform[key].count = (ftrPerform[key].count || 0) + fighter.countable[key];
                        ftrPerform[key].total = (ftrPerform[key].total || 0) + 1;
                    }
                })
            })

            // Devide count with total, get average
            for (let i in list) {
                for (let j in list[i]) {
                    let { count, total } = list[i][j];
                    list[i][j] = count / total;
                }
            }

            // Merge countables with original fighterList arr
            for (let fight in fightList) {
                for (let each in fightList[fight]) {
                    // Each fighter in the fight
                    let fighter = fightList[fight][each];

                    // fighter object = combin of original and new countable
                    fightList[fight][each] = { ...fighter, ...list[fighter.name] };

                    // Remove countable original object / inside each fighter
                    delete fightList[fight][each].countable;
                }
            }

            // Organize each fighter object
            return this.stageFour(fightList);
        }
    }
}

module.exports = StageThree;