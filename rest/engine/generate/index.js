const Actions = require('./actions');

class Generate extends Actions {
    constructor() {
        super();

        this.draft = async (req, send) => {
            let fights = req.body.draft.fights;

            let fgtrList = await this.setOpponent(fights);
            let pureCombins = await this.combinations(fgtrList, 6);

            let cleanCombins = await this.cleanCombins(pureCombins);
            let count = await this.countCombins(cleanCombins);

            let test = await this.detect(count);

            send();
        }
    }
}

module.exports = new Generate;