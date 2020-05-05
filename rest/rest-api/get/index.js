const db = require('../../../db');

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
        for (let each in draft.fights) {
            if (!draft.fights[each].dk) {
                break
            }
            inputMode = false;
        }

        return callback({ draft, inputMode, models });
    }
}

module.exports = new Get;