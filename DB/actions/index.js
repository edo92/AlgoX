const db = require('../modules');

class DbActions {
    constructor() {
        this.db = db;

        this.getEvents = async () => {
            try {
                return await db.Events.find();
            }
            catch (error) { throw error };
        }

        this.getFighters = async () => {
            try {
                return await db.Fighter.find();
            }
            catch (error) { throw error };
        }

        this.saveEvents = async list => {
            try {
                await list.map(async event => {
                    return await db.Events.create(event);
                })
                return 'Saved';
            }
            catch (error) { throw error };
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
            } catch (error) { throw error };
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
            catch (error) { throw error };
        }

        this.updateEventFight = async data => {
            let { eventId, urlId, fighter, combinedData } = data;

            try {
                await db.Events.updateOne(
                    {
                        _id: eventId,
                        'fights.statUrl': urlId
                    },
                    {
                        $set: {
                            [`fights.$.${fighter}`]: combinedData
                        }
                    }
                )
            }
            catch (error) { throw error };
        }

        this.createFighter = async fighterData => {
            try {
                return await db.Fighter.create(fighterData)
            }
            catch (error) { throw error };
        }

        this.isFighterExists = async fighterId => {
            return await db.Fighter.exists({ fighterId });
        }
    }
}

module.exports = new DbActions;