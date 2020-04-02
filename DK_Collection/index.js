const path = require('path');
const fs = require('fs');
const db = require('../DB');

const vision = require('./readImage');

class DkCollection {
    constructor() {
        this.state = {};
        this.event = {};
    }

    start = () => {
        db.connect(async () => {
            this.getDir('images', event => {
                this.getDir(`images/${event}`, async image => {
                    this.event = await db.db.Events.findOne({ name: event });

                    let imgTxt = await vision.readImage(`images/${event}/${image}`);

                    let updated = await combineData(this.event, imgTxt);

                    await db.actions.saveDkPointsToEvent(event, updated);

                    this.monitorState(event, imgTxt);
                });
            });
        })

        async function combineData(thisEvent, dkData) {
            await thisEvent.fights.map(fight => {
                Object.keys(dkData).map(fighter => {
                    if (compareNames(fight.fighter1.name, fighter)) {
                        fight.fighter1.dk = dkData[fighter];
                    }
                    else if (compareNames(fight.fighter2.name, fighter)){
                        fight.fighter2.dk = dkData[fighter];
                    }
                })
            })
            return thisEvent;
        }


        function compareNames(str1, str2) {
            let check = {};

            if (str1 && str2) {
                if (editDistance(str1, str2) > 3) {
                    str1.split(' ').map((s1, i) => {
                        let s2 = str2.split(' ')[i];
                        if (editDistance(s1, s2) > 3) {
                            check['fail'] = (check['fail'] || 0) + 1;
                        }
                    })
                }
            } else check.fail = 1;

            if (check.fail) return false;

            return true;

            function editDistance(s1, s2) {
                if (!s1 || !s2) return false;

                s1 = s1.toLowerCase();
                s2 = s2.toLowerCase();

                var costs = new Array();
                for (var i = 0; i <= s1.length; i++) {
                    var lastValue = i;
                    for (var j = 0; j <= s2.length; j++) {
                        if (i == 0)
                            costs[j] = j;
                        else {
                            if (j > 0) {
                                var newValue = costs[j - 1];
                                if (s1.charAt(i - 1) != s2.charAt(j - 1))
                                    newValue = Math.min(Math.min(newValue, lastValue),
                                        costs[j]) + 1;
                                costs[j - 1] = lastValue;
                                lastValue = newValue;
                            }
                        }
                    }
                    if (i > 0)
                        costs[s2.length] = lastValue;
                }
                return costs[s2.length];
            }
        }
    }

    getDir = (dir, callback) => {
        const directoryPath = path.join(__dirname, dir);
        fs.readdir(directoryPath, (err, files) => {
            if (err) throw err;

            //listing all files using forEach
            files.forEach(file => setTimeout(() => {
                callback(file)
            }, 800));
        });
    }

    monitorState = (event, imgTxt) => {
        this.state.image = (this.state.image || 0) + 1;
        this.state.event = event;

        console.log('--------- Collect Dk ----------');

        console.log(this.state)

        console.log('-------------------------------');
    }
}

let DK = new DkCollection;
DK.start();