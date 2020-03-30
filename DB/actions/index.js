const db = require('../modules');

class DbActions {
    constructor() {
        this.saveEvents = async list => {
            return await list.map(async event => {
                return await db.Events.create({ event });
            })
        }

        this.getEvents = async () => {
            return await db.Events.find();
        }

        this.saveEventFights = async (id, fights) => {
            try {
                let thisEvent = await db.Events.findOne({ _id: id });
                return await db.Events.findOneAndUpdate(
                    { _id: id },
                    { event: { ...thisEvent.event, fights: fights } },
                )
            } catch (err) {
                throw err
            }
        }

        this.saveFightStats = async (eventId, index, stats) => {
            let thisEvent = await db.Events.findOne({ _id: eventId });

            let updated = { ...thisEvent.event.fights[index], ...stats };
            thisEvent.event.fights[index] = updated;

            try {
                await db.Events.findOneAndUpdate(
                    { _id: eventId },
                    { event: await thisEvent.event },
                )
            } catch (err) {
                console.log("error updating")
            }
        }
    }
}

module.exports = new DbActions;