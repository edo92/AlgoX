const db = require('../../DB');
const encode = require('./encode.json');

class PrepareData {
    constructor() {
        this.prepareData = async () => {
            db.connect();
            // Get Fights list from db actions
            let fightList = await db.actions.getRawFightList();

            // Constract f1 f2 objects in arr
            let fightsConst = this.constractData(fightList);

            // Suffle List
            let suffleData = this.shuffleData(fightsConst)

            // Constract Outcome 
            return this.constractOutcome(suffleData);
        }
    }

    shuffleData = list => {
        // First layer suffle
        let shuffledList = shuffle(list);

        // Second layer shuffle
        shuffledList.map(fight => {
            shuffle(fight);
        })

        function shuffle(arr) {
            let limit = Math.floor(Math.random() * 5) + 1;
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

    constractData = list => {
        return list.map((fight, i) => {
            return ['fighter1', 'fighter2'].map(fighter => {
                // Record for fighter 1,2 
                let record = fight[fighter].record.stats;

                // Delete pastFights object 
                delete record.pastFights;

                // Combine all data together
                let stats = {
                    ...record,
                    fppf: fight[fighter].dk.fppf || 0,
                    weightClass: encodeString({ weightClass: fight.weightClass }) || 0,
                    stance: encodeString({ stance: record.stance }) || 0,
                    outcome: encodeString({ outcome: fight[fighter].outcome }) || 0,
                }

                // Concat all data in array fro each fighter
                return Object.keys(stats).map(data => {
                    return stats[data];
                })
            })
        })
        function encodeString(str) {
            let selected = [str[Object.keys(str)[0]]];
            let encodeList = encode[Object.keys(str)[0]];
            return encodeList[selected];
        }
    }

    constractOutcome = fightList => {
        return {
            data: fightList,
            outcome: fightList.map(fight => {
                return fight.map(fighter => {
                    return [fighter.pop()];
                })
            }),
        }
    }
}

module.exports = PrepareData;