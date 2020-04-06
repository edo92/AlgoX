const path = require('path');
const fs = require('fs');
const db = require('../DB');
const compareNames = require('./utility/compare');

const vision = require('./readImage');

class DkCollection {
    constructor(event) {
        this.eventName = event;
        this.state = {};
        this.event = {};
    }

    start = () => {
        db.connect(async () => {
            this.event = await db.db.Events.findOne({ name: this.eventName });

            this.getDir(`images/${this.eventName}`, async image => {
                let imgTxt = await vision.readImage(`DK_Collection/images/${this.eventName}/${image}`);

                let updated = await this.combineData(this.event, imgTxt);

                await db.actions.saveDkPointsToEvent(this.eventName, updated);

                this.monitorState(this.eventName, imgTxt);
            });
        })
    }

    combineData = async (thisEvent, dkData) => {
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

    getDir = (dir, callback) => {
        const directoryPath = path.join(__dirname, dir);
        fs.readdir(directoryPath, (err, files) => {
            if (err) throw err;

            files.forEach((file, index) => {
                let diff = index > 8 ? 3 : 0;
                this.state.total = (this.state.total || 0) + 1;
                setTimeout(() => { callback(file) }, 6000 * index - diff);
            });
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

module.exports = DkCollection;