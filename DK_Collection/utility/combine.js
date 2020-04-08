const compareNames = require('./compare');

module.exports = async (thisEvent, dkData) => {
    await thisEvent.fights.map(fight => {
        Object.keys(dkData).map(fighter => {
            if (compareNames(fight.fighter1.name, fighter)) {
                fight.fighter1.dk = { ...fight.fighter1.dk, ...dkData[fighter] };
            }
            if (compareNames(fight.fighter2.name, fighter)) {
                fight.fighter2.dk = { ...fight.fighter2.dk, ...dkData[fighter] };
            }
        })
    })
    return thisEvent;
}