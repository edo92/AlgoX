const Actions = require('./actions');

class Generate extends Actions {
    constructor() {
        super();

        this.draft = (req, send) => {
            let fights = req.body.draft.fights;

            let fgtrList = this.setOpponent(fights);
            let pureCombins = this.combinations(fgtrList, 6);

            let cleanCombins = this.cleanCombins(pureCombins);

            let test = this.rateCombins(cleanCombins);

            send();
        }
    }
}

module.exports = new Generate;