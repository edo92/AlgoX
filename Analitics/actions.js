const db = require('../DB');

class Actions {
    constructor() {
        this.fighters = {};

        this.getFighterStats = async () => {
            let fighterList = await db.db.Fighter.find();

            await fighterList.map(fighter => {
                this.fighters[fighter._id] = fighter;
            });

            return await this.fighters;
        }
    }
}

module.exports = new Actions;