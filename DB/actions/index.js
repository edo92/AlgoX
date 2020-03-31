const db = require('../modules');

class DbActions {
    constructor() {
        this.db = db;

        this.saveEvents = async list => {
            return await list.map(async event => {
                return await db.Events.create(event);
            })
        }

        this.getEvents = async () => {
            try {
                return await db.Events.find();
            }
            catch (err) {
                throw err;
            }
        }

        this.saveEventFights = async (id, fights) => {
            try {
                let thisEvent = await db.Events.findOne({ _id: id });
                return await db.Events.findOneAndUpdate(
                    { _id: id },
                    { ...thisEvent.event, fights: fights }
                )
            } catch (err) {
                throw err
            }
        }

        this.saveFightStats = async (eventId, index, stats) => {
            let thisEvent = await db.Events.findOne({ _id: eventId });

            let updated = { ...thisEvent.fights[index], ...stats };
            thisEvent.fights[index] = updated;

            try {
                await db.Events.findOneAndUpdate(
                    { _id: eventId },
                    { fights: await thisEvent.fights  },
                )
            } catch (err) {
                console.log("error updating", err)
            }
        }

        this.saveFighterStats = async (fighter, stats) => {
            return await db.Fighter.create({
                name: fighter.name,
                stats: stats
            })
        }
    }
}

module.exports = new DbActions;