class CustomDataset {
    constructor() {
        this.state = {
            size: 0,
            dataPoints: 0
        }
    }

    dataset = (fightList, config) => {
        let dataset = fightList.map(fight => {
            this.state.size += 1; // count dataset
            return ['fighter1', 'fighter2'].map(each => {
                let fighter = fight[each];
                this.state.dataPoints = Object.keys(fighter.stats).length - 1;
                return {
                    name: fighter.name,
                    outcome: fighter.outcome,
                    ...objectCreator(fighter.stats)
                }
            })
        })
        return { dataset, info: this.state };

        function objectCreator(stats) {
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
    }
}

module.exports = new CustomDataset;