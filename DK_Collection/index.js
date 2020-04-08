const db = require('../DB');
const util = require('./utility');

const vision = require('./vision');

class DkCollection {
    constructor(event) {
        this.path = `images/${event}`;
        this.state = {};
    }

    dkCollection = async () => {
        let test = 'UFC Fight Night: Edgar vs. The Korean Zombie'
        this.event = await db.actions.findEvent(test); //this.event

        util.getDir(this.path, async image => {
            // Read Image
            let dkRecord = await vision.readImage(`${this.path}/${image}`);

            // Combine dk image data with fighter object
            let updated = await util.combine(this.event, dkRecord);

            // Save dk data to each fighter in the fight for each event
            await db.actions.saveDkPointsToEvent(this.eventName, updated);

            this.monitorState();
        })
    }

    monitorState = () => {
        console.log('-------------------------------');
        console.log('Event:', this.event.name);
        console.log(this.state);
    }
}

module.exports = DkCollection;