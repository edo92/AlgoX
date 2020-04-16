class WL {
    constructor() {
        this.state = {};
    }

    create = (fightList, callback) => {
        let trainData = fightList.map(fight => {
            return fight.map(fighter => {
                // return data in stats

                // Make order
                let stats = this.constract(fighter.stats);

                let statlist = Object.keys(stats).map(stat => {
                    return stats[stat];
                })

                this.state.length = statlist.length;
                
                // Add extra data
                // statlist.push(fighter.name);
                statlist.push(fighter.outcome);

                return statlist;
            })
        })

        let outcome = trainData.map(data => {
            return data.map(each => {
                return [each.pop() === 'Loss' ? 0 : 1];
            })
        })

        this.monitorProgress();
        callback({ trainData, outcome });
    }

    monitorProgress = () => {
        console.log('state', this.state);
    }

    constract = stats => {
        return {
            age: stats.age,
            hight: stats.hight,
            weight: stats.weight,
            reach: stats.reach,

            strAcc: stats.strAcc,
            strDef: stats.strDef,
            tdAcc: stats.tdAcc,

            kd: stats.kd,
            subAtt: stats.subAtt,
            pass: stats.pass,
            rev: stats.rev,

            sigStr: stats.sigStr,
            takeDown: stats.takeDown,

            sigStrTotal: stats.sigStrTotal,
            sigStrLanded: stats.sigStrLanded,
            strHeadLanded: stats.strHeadLanded,

            strHeadTotal: stats.strHeadTotal,
            strBodyLanded: stats.strBodyLanded,
            strBodyTotal: stats.strBodyTotal,
            strLegLanded: stats.strLegLanded,
            strLegTotal: stats.strLegTotal,
            distanceSucc: stats.distanceSucc,
            distanceTotal: stats.distanceTotal,
        }
    }
};

module.exports = new WL;