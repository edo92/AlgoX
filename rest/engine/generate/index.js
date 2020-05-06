const combinations = require('./combins');
const lableCombins = require('./lable');
const sortCombins = require('./sort');
const filterCombins = require('./filter');

class Generate {
    constructor() {
        this.draft = async (req, send) => {
            let { draft, filter } = req.body;

            let combins = combinations(draft.fights);

            let labled = lableCombins(combins);

            if (!filter) {
                let sort = sortCombins(labled);
                return send(sort);
            }
            else {
                let filtered = filterCombins(labled, filter);
                return send(filtered)
            }
        }
    }
}

module.exports = new Generate;