const db = require('../../../db');
const util = require('../../utility');

class Get {
    init = async (req, callback) => {
        let models = await db.models.Model.find();
        let datasets = await db.models.Dataset.find();

        let dataset = await db.models.Admin.findOne();
        let model = await db.models.Model.findOne().sort({ btAcc: -1 });

        let result = model ? model.result : {};
        return callback({ models, datasets, model: result, dataset });
    }

    fighterStats = async (req, callback) => {
        let stats = await db.models.Fighters.findOne({ fighterId: req.body.id });
        callback(stats);
    }

    cards = async (req, send) => {
        let event = await db.models.Combins.findOne();

        event.cards.map(card => {
            card.config.saved = true;
        })

        return send({ cards: event.cards, fighters: fightersCount(event.cards) });

        function fightersCount(list) {
            let fighters = {};

            list.map(card => {
                card.fighters.map(fighter => {
                    if (!fighters[fighter.name]) {
                        fighters[fighter.name] = 0;
                    }
                    fighters[fighter.name] += 1;
                })
            })
            return fighters;
        }
    }

    draftInit = async (req, callback) => {
        let draft = await db.models.Draft.findOne();
        let models = await db.models.Model.find();

        let inputMode = true;

        if (draft) {
            // Check if all fighters have dk points (switch inputMode)
            for (let each in draft.fights) {
                if (!draft.fights[each].dk) {
                    break
                }
                inputMode = false;
            }

            let fighters = {};
            for (let each in draft.fights) {
                for (let i = 1; i < 3; i++) {
                    let fighter = draft.fights[each][`fighter${i}`];
                    if (!fighters[fighter.name]) {
                        fighters[fighter.name] = false
                    }
                }
            }
            return callback({ draft, fighters, inputMode, models });
        }
        else {
            return await util.scrape.upcomingEvent(async draft => {
                // Save Upcoming event in Draft
                let saved = await db.models.Draft.create(draft);

                if (saved) { // Check if all fighters have profile, else create
                    util.scrape.fighterStats(draft.fights, async fighter => {
                        let exists = await db.models.Fighters.exists({ fighterId: fighter.fighterId });

                        if (!exists) {
                            // Create fighter profile
                            await db.models.Fighters.create(fighter);
                        }
                    })
                    callback({ draft, inputMode, models });
                }
            })
        }
    }
}

module.exports = new Get;