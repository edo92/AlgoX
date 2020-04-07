class StageThree {
    constructor() {
        this.stageThree = fightList => {
            let list = {};

            fightList.map(fight => {
                ['fighter1', 'fighter2'].map(each => {
                    let fighter = fight[each];

                    if (!list[fighter.name]) {
                        list[[fighter.name]] = fighter;
                    }

                    console.log('list', list)
                })
            })
        }
    }
}

module.exports = StageThree;