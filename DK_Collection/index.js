const db = require('../DB');
const fs = require('fs')

const util = require('./utility');
const config = require('../config.json');

const vision = require('./vision');

class DkCollection {
    constructor(event) {
        this.eventName = event;
        this.path = `images/${event}`;
        this.state = {};
    }

    dkCollection = async () => {
        let isExists = false;

        // Check if event has been compleated
        for (let reg in config.registered) {
            let regEv = config.registered[reg];
            regEv === this.eventName ? isExists = true : isExists = false;
        }

        if (isExists) {
            this.registerLog({ message: `Event has been registered` })
        }
        else {
            this.event = await db.actions.findEvent(this.eventName); //this.event

            util.getDir(this.path, async (image) => {
                // Register log
                this.registerLog('images');

                // Read Image
                let dkRecord = await vision.readImage(`${this.path}/${image}`);

                // Combine dk image data with fighter object
                let updated = await util.combine(this.event, dkRecord);

                // Save dk data to each fighter in the fight for each event
                await db.actions.saveDkPointsToEvent(this.eventName, updated);

                this.registerLog('registed');
            })
            this.registerEvent(this.eventName);
        }
    }

    registerLog = key => {
        if (typeof key === 'string') {
            this.state[key] = (this.state[key] || 0) + 1;
        }
        else if (typeof key === 'object') {
            this.state.message = (this.state.message || '') + key.message;
        }
        this.monitorState();
    }

    registerEvent = event => {
        fs.readFile('config.json', function (err, data) {
            var json = JSON.parse(data)
            json.registered.push(event);

            fs.writeFile('config.json', JSON.stringify(json), (err) => {
                if (err) throw err;
            })
        })
    }

    monitorState = () => {
        console.log('-------------------------------------');
        console.log(this.state);
    }
}

module.exports = DkCollection;