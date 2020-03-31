const mine = require('../mine');
const db = require('../../DB');

class StageFour {
    constructor() {
        this.state = {};
    }

    start = async () => {
        let eventList = await db.actions.getEvents();

        eventList.map(event => {
            event.fights.map((fight, index) => {
                ['fighter1', 'fighter2'].map(fighter => {
                    this.state.total = (this.state.total || 0) + 1;
                    this.getFighterStats(fight[fighter], fighter, event, index);
                });
            })
        })
    }

    monitorState = () => {
        console.log('--------------- Stage Four ---------------');
        console.log(this.state);
        console.log('------------------------------------------');
    }

    getFighterStats(ftrData, which, event, index) {
        let fighter = Object.assign({}, ftrData);

        let url = fighter.fighterUrl;

        if (!fighter.fighterId) {
            mine.getFighterStats(url, async stats => {
                if (stats.success) {
                    // Create document for fighter info
                    db.actions.saveFighterStats(fighter, stats.success, async data => {
                        // Link created id to fighter in fightList
                        fighter.fighterId = data._id;

                        if (data._id) {
                            // Saved linked fight index
                            await db.actions.saveStatId(event, fighter, which, index);

                            // Increment Collected
                            this.state.collected = (this.state.collected || 0) + 1;

                            // Monitore progress
                            this.monitorState();
                        }
                    });
                } else {
                    // If failed reRequest
                    this.getFighterStats(fighter, which, event, index);
                }
            })
        }
    }
}

module.exports = StageFour;