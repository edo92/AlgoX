class Format3d {
    constructor() {
        this.state = {
            size: 0,
            dataPoints: 0
        };
    }

    convert3d = async fightList => {
        let dataset = fightList.map(fight => {
            this.state.size += 1;

            return ['fighter1', 'fighter2'].map((fighter, i) => {
                let constStats = this.constractStats(fight[fighter].stats);

                let dataPoints = Object.keys(constStats);

                this.state.dataPoints = dataPoints.length;

                let stats = dataPoints.map(key => {
                    return fight[fighter].stats[key];
                })

                stats.push(i ? 'Loss' : 'Win');

                return stats;
            })
        })

        // Shuffle
        dataset = await this.shuffle(dataset);

        // Separate outcome
        let outcome = dataset.map(set => {
            return set.map(each => {
                return [each.pop() === 'Win' ? 1 : 0];
            })
        })

        // Separate names
        let name = dataset.map(set => {
            return set.map(each => {
                return [each.pop()];
            })
        })

        return { dataset, outcome, name, info: this.state };
    }

    shuffle = list => {
        // First layer suffle
        let shuffledList = shuffle(list);

        // Second layer shuffle
        shuffledList.map(each => {
            shuffle(each);
        })

        function shuffle(arr) {
            let limit = Math.floor(Math.random() * 25) + 10;
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

    constractStats = stats => {
        return {
            age: stats.age,
            hight: stats.hight,
            weight: stats.weight,
            reach: stats.reach,

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

            name: stats.name
        }
    }
}

module.exports = new Format3d;