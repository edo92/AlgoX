const CollectEvents = require('./collectEvent');

class GetUpcomingEvents extends CollectEvents {
    getUpcomingEvents = async (data, db, callback) => {
        let savedEvents = await db.UpcomingEvent.find();
        
        if (savedEvents.length < 1) {
            // Create upcoming event
            let list = await this.collectEvents();
            // Create Event
            await db.UpcomingEvent.create(list);

            // Get updated event list
            savedEvents = await db.UpcomingEvent.find();
            // send back 3 upcome events
            callback(savedEvents);
        }
        else {
            callback(savedEvents);
        }
    }
}

module.exports = new GetUpcomingEvents;