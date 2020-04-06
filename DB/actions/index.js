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
    }
}

module.exports = new DbActions;