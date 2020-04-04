const db = require('../DB');

class PrepareData {
    constructor() {
        this.prepareData = () => {
            db.connect(async () => {
                let fightList = await db.actions.getRawFightList();

                fightList.map(fight => {
                    return {
                        
                    }
                })
            })
        }
    }
}

module.exports = PrepareData;