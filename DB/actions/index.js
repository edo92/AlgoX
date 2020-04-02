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

        this.saveFightStats = async (eventId, event) => {
            try {
                await db.Events.findOneAndUpdate(
                    { _id: eventId },
                    { fights: await event.fights },
                )
            } catch (err) {
                console.log("error updating", err)
            }
        }

        this.saveFighterStats = async (fighter, stats, callback) => {
            // Split url id from each fighter url link
            let urlId = fighter.fighterUrl.split('/')[4];

            // Query id if fighter exists
            let isExists = await db.Fighter.findOne({ id: urlId });

            // Save is record is not found, cb saved fighter id
            if (!isExists) {
                try {
                    // Create Fighter document
                    let savedData = await db.Fighter.create({
                        name: fighter.name, id: urlId, stats: stats
                    });
                    // Send back created fighter _id
                    callback(savedData._id);
                } catch (err) { return err };
            }
        }

        this.saveStatId = async (event, fighter, which, index) => {
            event.fights[index][which] = fighter;

            try {
                return await db.Events.findOneAndUpdate(
                    { _id: event._id },
                    { fights: await event.fights }
                )
            } catch (err) { return err }
        }

        this.saveDkPointsToEvent = async (event, updated) => {
            try {
                let saved = await db.Events.findOneAndUpdate(
                    { name: event },
                    { fights: await updated.fights }
                );
                return { success: saved };
            } catch (error) { consle.log("------errorr-----"); return { error } };
        }
    }
}

module.exports = new DbActions;