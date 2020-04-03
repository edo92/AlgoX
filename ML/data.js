const db = require('../DB');

class PrepareData {
    constructor() {
        this.testData = () => {
            db.connect(async () => {
                let fightList = await db.actions.getFightList();

                fightList.map(fight => {
                    let { fighter1, fighter2 } = fight;
                    return {
                        f1: {
                            outcome: fighter1.outcome,
                            hight: d
                        },
                        f2: {
                            outcome: fighter2.outcome
                        }
                    }

                    console.log('f1')
                    console.log('f1', fight.fighter2)

                })
            })
        }
    }
}

module.exports = PrepareData;