const db = require('../../../db');

class Get {
    init = async (req, callback) => {
        let models = await db.models.Model.find();
        let datasets = await db.models.Dataset.find();

        let dataset = await db.models.Admin.findOne();

        let model = await db.models.Model.findOne().sort({ btAcc: -1 });

        return callback({ models, datasets, model: model.result, dataset });
    }
}

module.exports = new Get;