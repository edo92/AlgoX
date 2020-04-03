const db = require('../DB');
const analizer = require('./analizer/weightClass');

start();
function start() {
    db.connect(async () => {
        let fightersList = await db.actions.getFightList();

        // Stage One
        analizer.byWeightClass(fightersList);
    })
}