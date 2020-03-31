const actions = require('./actions')
const db = require('../DB');

start();
async function start() {
    db.connect(async () => {
        // let test = actions.test();
        let test = await db.db.Events.find({ name: 'UFC Fight Night: Lee vs. Oliveira' });
        console.log(test)
    })
}