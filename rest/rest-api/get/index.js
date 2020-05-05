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

    draftInit = async (req, callback) => {
        let draft = await db.models.Draft.findOne();
        let models = await db.models.Model.find();

        let inputMode = true;

        if (draft) {
            for (let each in draft.fights) {
                if (!draft.fights[each].dk) {
                    break
                }
                inputMode = false;
            }
            return callback({ draft, inputMode, models });

        } else {
            await util.scrape.upcomingEvent(draft => {
                return callback({ draft, inputMode, models });
            });
        }
    }
}

module.exports = new Get;