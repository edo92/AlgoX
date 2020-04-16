const db = require('../modules');

class DbActions {
    constructor() {
        this.db = db;

        this.getEvents = async () => {
            try {
                return await db.Events.find();
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


        this.getUpcomeEvent = async () => {
            try {
                return await db.UpcomingEvent.findOne().sort({ date: 1 });
            }
            catch (err) { throw err };
        }

        this.getUpcomeFights = async () => {
            try {
                let upcomeEvent = await this.getUpcomeEvent();
                return upcomeEvent.fights.map(fight => {
                    return fight;
                });
            }
            catch (err) { throw err };
        }
    }
}

module.exports = new DbActions;