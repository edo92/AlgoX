class WL {
    constructor() {
        this.state = {};
    }

    stageThree = (fightList, trackProgress) => {
        let dataset = fightList.map(fight => {
            return fight.map(fighter => {
                trackProgress(); // Track progress percenet

                // Make order
                let stats = this[this.config.format](fighter.stats);

                // Reaturn each data point rount nearest 10
                let statlist = Object.keys(stats).map(stat => {
                    return stats[stat]//Math.round(stats[stat] * 2) / 2;
                })

                // Count constracted objects
                this.registerLog('constracted', statlist.length)

                if (this.config.plain) {
                    statlist.push(fighter.name);
                }
                else if (this.config.dataset) {
                    statlist.push(fighter.outcome);
                }

                return statlist;
            })
        })

        // shuffle dataset
        if (this.config.shuffle) {
            dataset = this.shuffle(dataset);
        }

        // Separate outcome 
        let outcome = dataset.map(data => {
            return data.map(each => {
                trackProgress();
                if (this.config.dataset) {
                    return [each.pop() === 'Loss' ? 0 : 1]; // last item is outcome
                }
                else if (this.config.plain) {
                    return each.pop(); // last item is outcome
                }
            })
        })

        this.monitorProgress();

        let config = { ...this.config, points: this.state.constracted };
        return { dataset, outcome, config };
    }

    shuffle = list => {
        // First layer suffle
        let shuffledList = shuffle(list);

        // Second layer shuffle
        shuffledList.map(each => {
            shuffle(each);
        })

        function shuffle(arr) {
            let limit = Math.floor(Math.random() * 15) + 5;
            for (let times = 1; times <= limit; times++) {
                for (let i in arr) {
                    const j = Math.floor(Math.random() * i)
                    const temp = arr[i]
                    arr[i] = arr[j]
                    arr[j] = temp
                }
            }
            return arr;
        }
        return list;
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