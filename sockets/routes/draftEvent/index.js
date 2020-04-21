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

    save = async (data, db, callback) => {
        let drafted = await db.Draft.find();
        let { fights, _id } = drafted[0];

        fights.map(fight => {
            ['fighter1', 'fighter2'].map(fighter => {
                if (data[fight[fighter].name]) {
                    fight[fighter].dk = data[fight[fighter].name];
                }
            })
        })

        try {
            await db.Draft.findOneAndUpdate(
                { _id },
                { $set: { fights: fights } }
            );
        } catch (err) { throw err };

        setTimeout(() => {
            this.get(null, db, callback);
        }, 2000);
    }

    get = async (data, db, callback) => {
        let drafts = await db.Draft.find();
        let models = await db.Model.find();

        let dkData = true;
        let dkValues = {};

        for (let draft in drafts) {
            let eachDraft = drafts[draft];

            for (let eachFight in eachDraft.fights) {
                let fight = eachDraft.fights[eachFight];

                for (let i = 1; i < 3; i++) {
                    let fighter = `fighter${i}`;
                    dkValues = {
                        ...dkValues,
                        [fight[fighter].name]:
                            fight[fighter].dk ? fight[fighter].dk : {}
                    }

                    let dPoints = fight[fighter].dk;
                    if (!dPoints.fppf || !dPoints.price) {
                        dkData = false;
                    }
                }
            }
        }
        // Callback
        let fights = drafts[0].fights;
        callback({ fights, models, dkData, dkValues, submited: false });
    }
}

module.exports = new DraftEvent;