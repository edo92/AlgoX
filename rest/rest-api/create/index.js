const db = require('../../../db');

class Create {
    draft = async (req, send) => {
        let test = await db.models.Combins.create({ cards: req.body.cards });
        send();
    }
}

module.exports = new Create;