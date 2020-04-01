const path = require('path');
const fs = require('fs');
const db = require('../DB');

const vision = require('./readImage');

class DkCollection {
    constructor() {
        this.state = {};
    }

    start = () => {
        db.connect(async () => {
            getDir('images', event => {
                getDir(`images/${event}`, async image => {
                    let imgTxt = await vision.readImage(`images/${event}/${image}`);
                    let thisEvent = await db.db.Events.findOne({ name: event });

                    let updated = await combineData(thisEvent, imgTxt);

                    await db.actions.saveDkPointsToEvent(event, updated);

                    this.monitorState(event, imgTxt);
                });
            });
        })

        async function combineData(thisEvent, data) {
            await thisEvent.fights.map((fight, index) => {
                ['fighter1', 'fighter2'].map(fighter => {
                    if (fight[fighter].name === data.fighter1.name) {
                        fight[fighter].dk = data.fighter1;
                    }
                    else if (fight[fighter].name === data.fighter2.name) {
                        fight[fighter].dk = data.fighter2;
                    }
                })
            })
            return thisEvent;
        }

        function getDir(dir, callback) {
            const directoryPath = path.join(__dirname, dir);
            fs.readdir(directoryPath, (err, files) => {
                if (err) throw err;

                //listing all files using forEach
                files.forEach(file => callback(file));
            });
        }
    }

    monitorState(event, imgTxt) {
        this.state.image = (this.state.image || 0) + 1;
        this.state.event = event;

        console.log('f1', imgTxt.fighter1.name);
        console.log('f2', imgTxt.fighter2.name);

        this.state.fight = `${imgTxt.fighter1.name} - ${imgTxt.fighter2.name}`

        console.log('--------- Collect Dk ----------');

        console.log(this.state)

        console.log('-------------------------------');
    }
}

let DK = new DkCollection;
DK.start();