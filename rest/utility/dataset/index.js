const db = require('../../../db');
const format = require('../format');

class ConstractDataset {
    constructor() {
        this.state = {};
    }

    constractRawDataset = async config => {
        let fights = await this.getAllFights();
        let fighters = await this.combinePerfomStats(fights);

        if (config.list === 'all') {
            this.list = fights;
        }
        else {
            this.list = config.list;
        }

        await this.combineFighterStats(fighters);
        await this.combineWithOriginal(fighters);

        return await this.list;
    }

    combineWithOriginal = fighters => {
        this.list.map(fight => {
            ['fighter1', 'fighter2'].map(fighter => {
                fight[fighter] = {
                    ...fight[fighter],
                    stats: fighters[fight[fighter].fighterId],
                }
            })
        })
    }

    combineFighterStats = async fighters => {
        let fighterList = await db.models.Fighters.find();

        fighterList.map(fighter => {
            let constractStats = format.constractStats(fighter.stats);
            fighters[fighter.fighterId] = { ...fighters[fighter.fighterId], ...constractStats, ...{ name: fighter.name } }
        })

        return fighters;
    }

    combinePerfomStats = fights => {
        let fighters = {};
        fights.map(fight => {
            ['fighter1', 'fighter2'].map(fighter => {
                if (!fighters[fight[fighter].fighterId]) {
                    fighters[fight[fighter].fighterId] = {};
                }

                fighters[fight[fighter].fighterId].count = (
                    fighters[fight[fighter].fighterId].count || 0
                ) + 1;

                let stats = format.performaceRawData(fight[fighter].stats)

                Object.keys(stats).map(key => {
                    if (!fighters[fight[fighter].fighterId][key]) {
                        fighters[fight[fighter].fighterId][key] = 0;
                    }

                    fighters[fight[fighter].fighterId][key] += stats[key];
                })
            })
        })

        Object.keys(fighters).map(fighter => {
            Object.keys(fighters[fighter]).map(key => {
                if (key !== 'count') {
                    fighters[fighter][key] = Math.round(fighters[fighter][key] / fighters[fighter].count);
                }
            })
        })
        return fighters;
    }

    getAllFights = async () => {
        let events = await db.models.Events.find();
        let list = [];

        events.map(event => {
            event.fights.map(fight => {
                list.push(fight);
            })
        })

        return list;
    }
}

module.exports = new ConstractDataset;