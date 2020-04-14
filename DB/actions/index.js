const db = require('../modules');

class DbActions {
    constructor() {
        this.db = db;

        this.getEvents = async () => {
            try {
                return await db.Events.find().limit(5);
            }
            catch (err) { throw err }
        }

        this.getAllFights = async () => {
            let events = await this.getEvents();
            // Return all fights of every event
            return events.map(event => {
                for (let fight in event.fights) {
                    return event.fights[fight];
                }
            })
        }
    }
}

module.exports = new DbActions;