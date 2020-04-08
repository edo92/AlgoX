const db = require('../modules');

class DbActions {
    constructor() {
        this.db = db;

        this.findEvent = async eventName => {
            try {
                return await db.Events.findOne({ name: eventName });
            }
            catch (err) { throw err };
        }

        this.saveDkPointsToEvent = async (event, updated) => {
            try {
                let saved = await db.Events.findOneAndUpdate(
                    { name: event },
                    { fights: await updated.fights }
                );
                return { success: saved };
            } catch (error) { return { error } };
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
    }
}

module.exports = new DbActions;