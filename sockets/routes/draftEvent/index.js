class DraftEvent {
    draftEvent = async (data, db, callback) => {
        let event = await db.UpcomingEvent.findOne({ _id: data.event });

        await db.Draft.create({
            name: event.name,
            date: event.date,
            location: event.location,
            fights: event.fights
        });
    }

    getDraft = async (data, db, callback) => {
        let draft = await db.Draft.find();
        callback(draft);
    }
}

module.exports = new DraftEvent;