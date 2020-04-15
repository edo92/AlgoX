const CollectEvents = require('./collectEvent');

class GetUpcomingEvents extends CollectEvents {
    getUpcomingEvents = async (data, db, callback) => {
        let list = await this.collectEvents(db);

        // let savedEvents = await db.UpcomingEvent.find();

        // if (savedEvents.length < 3) {
        //     // Screate upcoming 3 events
        //     let list = await this.collectEvents();
        //     // Create Event
        //     await db.UpcomingEvent.create(list);

        //     // Get updated event list
        //     savedEvents = await db.UpcomingEvent.find();
        //     // send back 3 upcome events
        //     callback(savedEvents);
        // }
        // else {
        //     callback(savedEvents);
        // }
    }
}

module.exports = new GetUpcomingEvents;