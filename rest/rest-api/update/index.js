const db = require('../../../db');
const util = require('../../utility');

class Update {
    constructor() {
        this.state = {
            events: 0,
            fights: 0,
            fighters: 0
        };
    }

    stats = async (req, send) => {
        let events = await db.models.Events.find();

        let test = new util.test;
        this.state = await test.validate(events);

        // Get (index->0) admin coll.
        let admin = await db.models.Admin.findOne();

        // Update admin info
        let updated = await db.models.Admin.findOneAndUpdate(
            { _id: admin._id },
            { ...this.state }
        )

        send({ info: updated });
    }
}

module.exports = new Update;