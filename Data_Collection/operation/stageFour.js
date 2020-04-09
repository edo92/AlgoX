const mine = require('../mine');
const db = require('../../DB');

class StageFour {
    constructor() {
        this.fightList = [];
        this.state = {};
    }

    start = async () => {
        this.eventList = await db.actions.getEvents();

        const mineFighterStats = async (event, fight, each) => {
            // Each fighter in fight
            let fighter = fight[each];
            let fighterId = fighter.fighterUrl.split('/')[4];

            let saveData = {
                eventId: event._id,
                urlId: fight.statUrl,
                fighter: each,
                combinedData: { ...fighter, fighterId }
            }

            // Check if fighter exists
            let isExists = await db.actions.isFighterExists(fighterId);

            // If exits save just fighter id in the fight
            if (isExists) {
                // Just Update fighter id in each fight for each fighter
                await db.actions.updateEventFight(saveData);

                // If fighter exits
                this.registerLog('exists');
            }
            else {
                mine.getFighterStats(fighter.fighterUrl, async data => {
                    if (data.success) {
                        // Split fighterUrl id make as fither id
                        let fighterData = {
                            fighterId: fighterId,
                            name: fighter.name,
                            stats: data.success
                        };

                        // Create fighter profile
                        await db.actions.createFighter(fighterData);

                        // After creating userprofile update fighter id in each fight
                        await db.actions.updateEventFight(saveData);

                        // Count collected amount
                        this.registerLog('saved');
                    }
                    else {
                        mineFighterStats(event, fight, each);
                    }
                })
            }
        }

        // Runing funtion above
        await this.eventList.map(async event => {
            await event.fights.map(async fight => {
                ['fighter1', 'fighter2'].map(each => {
                    this.registerLog('total');
                    mineFighterStats(event, fight, each);
                })
            })
        })
    }

    registerLog = key => {
        this.state[key] = (this.state[key] || 0) + 1;
        this.monitorProgress();
    }

    monitorProgress = () => {
        console.log(this.state);
    }
}

module.exports = StageFour;