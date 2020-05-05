const combinations = require('./combins');
const lableCombins = require('./lable');
const sortCombins = require('./sort');

class Generate {
    constructor() {
        this.draft = async (req, send) => {
            let fights = req.body.draft.fights;
            let combins = combinations(fights);

            let labled = lableCombins(combins);

            let sort = sortCombins(labled);

            return send(sort);
        }
    }
}

module.exports = new Generate;