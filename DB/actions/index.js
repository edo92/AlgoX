const db = require('../modules');

class DbActions {
    constructor() {
        this.db = db;

        this.saveEvents = async list => {
            try {
                await list.map(async event => {
                    return await db.Events.create(event);
                })
                return 'Saved';
            }
            catch (err) { return 'Error Occured' };
        }

        this.getEvents = async () => {
            try {
                return await db.Events.find();
            }
            catch (err) { return 'Error Occured' };
        }

        this.saveEventFights = async (eventId, fights) => {
            try {
                let thisEvent = await db.Events.findOne({ _id: eventId });

                return {
                    success: await db.Events.findOneAndUpdate(
                        { _id: eventId },
                        { ...thisEvent.event, fights: fights }
                    )
                }
            } catch (err) { return { error: 'Error Occured' } };
        }

        this.saveFightStats = async data => {
            let { id, urlId, stats } = data;
            try {
                await db.Events.updateOne(
                    {
                        _id: id,
                        'fights.statUrl': urlId,
                    },
                    {
                        $set: {
                            'fights.$.fighter1': stats.fighter1,
                            'fights.$.fighter2': stats.fighter2
                        }
                    }
                )
                return { success: 'Saved' }
            }
            catch (err) { throw err; return { error: 'Error Occured' } };
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
        
        this.findEvent = async id => {
            try {
                return await db.Events.findOne({ _id: id });
            }
            catch (err) { return err };
        }
    }
}

module.exports = new DbActions;