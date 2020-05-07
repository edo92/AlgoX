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
                return send({ cards: sort, fighters: fightersCount(sort) });
            }
            else {
                let filtered = filterCombins(labled, filter);
                return send({ cards: filtered, fighters: fightersCount(filtered) })
            }

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
    }
}

module.exports = new Generate;