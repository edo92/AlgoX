class WL {
    constructor() {
        this.state = {};
    }

    stageThree = (fightList) => {
        let dataset = fightList.map(fight => {
            return fight.map(fighter => {
                // return data in stats

                // Make order
                let stats = this[this.config.format](fighter.stats);

                // Reaturn each data point rount nearest 10
                let statlist = Object.keys(stats).map(stat => {
                    return stats[stat]//Math.round(stats[stat] * 2) / 2;
                })

                // Count constracted objects
                this.registerLog('constracted', statlist.length)

                // statlist.push(fighter.name); // Add extra data
                statlist.push(fighter.outcome);

                return statlist;
            })
        })

        // Separate outcome 
        let outcome = dataset.map(data => {
            return data.map(each => {
                return [each.pop() === 'Loss' ? 0 : 1];
            })
        })

        this.monitorProgress();

        let config = { ...this.config, points: this.state.constracted };
        return { dataset, outcome, config };
    }

    // Reorganize data points object
    wl = stats => {
        this.registerLog('dataPoints', Object.keys(stats).length)
        return {
            age: stats.age,
            hight: stats.hight,
            weight: stats.weight,
            reach: stats.reach,
            fight: stats.fight,

            kd: stats.kd,
            subAvg: stats.subAvg,
            subAtt: stats.subAtt,
            pass: stats.pass,
            rev: stats.rev,

            // 
            sigStr: stats.sigStr,
            strAcc: stats.strAcc,
            strDef: stats.strDef,
            slpm: stats.slpm,

            takeDown: stats.takeDown,
            tdAcc: stats.tdAcc,
            tdDef: stats.tdDef,
            tdAvg: stats.tdAvg,

            // succ/total
            sigStrTotal: stats.sigStrTotal,
            sigStrLanded: stats.sigStrLanded,

            strHeadLanded: stats.strHeadLanded,
            strHeadTotal: stats.strHeadTotal,

            strBodyLanded: stats.strBodyLanded,
            strBodyTotal: stats.strBodyTotal,

            strLegLanded: stats.strLegLanded,
            strLegTotal: stats.strLegTotal,

            tdSucc: stats.tdSucc,
            tdTotal: stats.tdTotal,

            distanceSucc: stats.distanceSucc,
            distanceTotal: stats.distanceTotal,

            clinchSucc: stats.clinchSucc,
            clinchTotal: stats.clinchTotal,

            groundSucc: stats.groundSucc,
            groundTotal: stats.groundTotal,
        }
    }

    registerLog = (key, val) => {
        this.state[key] = (this.state[key] || val);
    }

    monitorProgress = () => {
        console.log('state', this.state);
    }
};

module.exports = WL;