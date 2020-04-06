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
            let fighter = fight[each];

            mine.getFighterStats(fighter.fighterUrl, async data => {
                if (!data.success) {
                    mineFighterStats(event, fight, each);
                }
                else {
                    let fighterId = fighter.fighterUrl.split('/')[4];

                    let fighterData = {
                        fighterId: fighterId,
                        name: fighter.name,
                        stats: data.success
                    };

                    let isExists = await db.actions.isFighterExists(fighterId);

                    if (!isExists) {
                        // Create fighte collection
                        try {
                            try {
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

                                this.state.collected = (this.state.collected || 0) + 1;
                            }
                        } catch (err) {
                            try {
                                await db.actions.createFighter(fighterData);
                            }
                            catch (createErr) {
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