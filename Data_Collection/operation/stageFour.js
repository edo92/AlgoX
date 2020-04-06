const mine = require('../mine');
const db = require('../../DB');

class StageFour {
    constructor() {
        this.fightList = [];
        this.state = {};
    }

    start = async () => {
        this.eventList = await db.actions.getEvents();

        const mineFighterStats = (event, fight, each) => {
            // Each fighter in fight
            let fighter = fight[each];

            // Mine fighter stats
            mine.getFighterStats(fighter.fighterUrl, async data => {
                if (!data.success) {
                    mineFighterStats(event, fight, each);
                }
                else {
                    // Split fighterUrl id make as fither id
                    let fighterId = fighter.fighterUrl.split('/')[4];

                    let fighterData = {
                        fighterId: fighterId,
                        name: fighter.name,
                        stats: data.success
                    };

                    // Check if fighter exists
                    let isExists = await db.actions.isFighterExists(fighterId);

                    if (!isExists) {
                        try {
                            try {
                                // Create fighte collection
                                await db.actions.createFighter(fighterData);
                            }
                            finally {
                                // Once fighter created increment collected point
                                let saveData = {
                                    eventId: event._id,
                                    urlId: fight.statUrl,
                                    fighter: each,
                                    combinedData: { ...fighter, fighterId }
                                }
                                // Update fighter id in each fight for each fighter
                                await db.actions.updateEventFight(saveData);

                                // Increment collected count
                                this.state.collected = (this.state.collected || 0) + 1;
                            }
                        } catch (err) {
                            // If error retry create
                            try {
                                await db.actions.createFighter(fighterData);
                            }
                            catch (createErr) {
                                // If retry failed increment state error
                                this.state.error = (this.state.error || 0) + 1;
                            }
                        }
                    }
                    this.monitorProgress();
                }
            })
        }

        await this.eventList.map(async event => {
            await event.fights.map(async fight => {
                ['fighter1', 'fighter2'].map(each => {
                    this.state.total = (this.state.total || 0) + 1;
                    mineFighterStats(event, fight, each);
                })
            })
        })
    }

    monitorProgress = () => {
        console.log(this.state)
    }
}

module.exports = StageFour;