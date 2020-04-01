const path = require('path');
const fs = require('fs');
const db = require('../DB');

const readImage = require('./readImage');

class DkCollection {
    constructor() {
        this.state = {};
    }

    start = () => {
        db.connect(async () => {
            getDir('images', event => {
                getDir(`images/${event}`, async image => {
                    let imgTxt = await readImage.readImage(`images/${event}/${image}`);
                    await saveData(event, imgTxt);
                    this.monitorState(event, image);
                });
            });

            async function saveData(event, imgTxt) {
                let thisEvent = await db.db.Events.findOne({ name: event });

                let updated = await combineData(thisEvent, imgTxt);

                await db.actions.saveDkPointsToEvent(event, updated);
            }

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
                    //handling error
                    if (err) throw err;

                    //listing all files using forEach
                    files.forEach(file => callback(file));
                });
            };
        })
    }

    monitorState = (event, image) => {
        this.state.image = (this.state.image || 0) + 1;
        this.state.event = event;

        console.log('--------- Collect Dk ----------');
        console.log(this.state)
        console.log('-------------------------------');
    }
}

let DK = new DkCollection;
DK.start();