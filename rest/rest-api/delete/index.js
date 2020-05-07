const db = require('../../../db');

class Delete {
    card = async (req, send) => {
        let card = req.body.card;

        await db.models.Combins.findOneAndUpdate(
            { name: card.name },
            {
                $pull: { cards: { _id: card._id } }
            }
        )
        return send();
    }
}

module.exports = new Delete;