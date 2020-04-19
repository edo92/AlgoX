const db = require('../../../../db/models');

class DbActions {
    constructor() {
        this.getEvents = async () => {
            try {
                return await db.Events.find().limit(4);
            }
            catch (err) { throw err }
        }

        this.getAllFights = async () => {
            let events = await this.getEvents();
            // Return all fights of every event

            let fightList = [];
            events.map(event => {
                fightList = fightList.concat(event.fights);
            })
            return fightList;
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

        this.findFighter = async fighterId => {
            return await db.Fighter.findOne({ fighterId });
        }

        this.getDraft = async () => {
            let draft = await db.Draft.find();
            return draft[0];
        }

        this.saveModel = async data => {
            try {
                return await db.Model.create(data);
            }
            catch (err) { throw err };
        }

        this.getModels = async () => {
            try {
                let list = [];
                return await db.Model.find().sort({ createdAt: 1 });
            }
            catch (err) { throw err };
        }

        this.deleteModel = async id => {
            try {
                return await db.Model.findOneAndDelete({ _id: id });
            }
            catch (err) { throw err };
        }

        this.saveDataset = async data => {
            try {
                return await db.Dataset.create(data);
            }
            catch (err) { throw err };
        }

        this.getDatasets = async () => {
            try {
                return await db.Dataset.find();
            }
            catch (err) { throw err };
        }

        this.deleteDataset = async id => {
            try {
                return await db.Dataset.findOneAndDelete({ _id: id });
            }
            catch (err) { throw err };
        }
    }
}

module.exports = new DbActions;