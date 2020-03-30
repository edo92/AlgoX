const db = require('../DB');

start();
async function start() {
    db.connect(async () => {
        let events = await db.actions.getEvents();

        let classList = {};
        events.map(item => {
            item.event.fights.map(fight => {
                if (!classList[fight.weightClass]) classList[fight.weightClass] = { total: 0 };
                classList[fight.weightClass].total = (classList[fight.weightClass].total || 0) + 1

                if (fight.method !== 'U-DEC' && fight.method !== 'S-DEC') {
                    if (!classList[fight.weightClass]) classList[fight.weightClass] = { finish: 0 };
                    classList[fight.weightClass].finish = (classList[fight.weightClass].finish || 0) + 1
                }
            })
        })
        console.log('--', classList)
    })
}