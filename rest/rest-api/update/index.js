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

        return send({ info: updated });
    }

    draft = async (req, send) => {
        let draft = req.body.draft;

        if (draft.fights) {
            let current = await db.models.Draft.findOne();
            await db.models.Draft.findOneAndUpdate(
                { _id: current._id },
                { fights: draft.fights }
            )
        }
    }

    combins = async (req, send) => {
        let card = req.body.card;
        console.log('card',card)

        let event = await db.models.Combins.findOne({ name: card.name });

        if (!event) {
            event = await db.models.Combins.create({ name: card.name });
        }

        let lookup = {}, exists = false;

        card.fighters.map(fighter => {
            lookup[fighter.name] = true;
        })

        event.cards.map(eachCard => {
            let num = 0;

            eachCard.fighters.map(fighter => {
                if (lookup[fighter.name]) {
                    num += 1;
                }
            })

            if (num === 6) {
                exists = true;
            }
        })
        if (!exists) {
            await db.models.Combins.findOneAndUpdate(
                { name: event.name },
                { $push: { cards: card } }
            )
        }  else {
            console.log('Event exists')
        }
    }
}

module.exports = new Update;