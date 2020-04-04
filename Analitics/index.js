const db = require('../DB');
const analizer = require('./relations/weightClass');

start();
function start() {
    db.connect(async () => {
        let rawData = await db.actions.getRawFightList();

        // Stage One
        analizer.byWeightClass(rawData);
    })
}