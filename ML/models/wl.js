const shuffleData = require('../../utility/suffle');

class WinLossRation {
    constructor(data) {
        this.fightList = data

        this.createWLData = () => {
            // Constract 3d array
            let readyData = this.fightList.map(fight => {
                return Object.keys(fight).map(each => {
                    // Each fight stats
                    return Object.keys(fight[each]).map(stats => {
                        // return stat point
                        return fight[each][stats];
                    })
                })
            })

            // Shuffle data 2 layer deep
            let shuffled = shuffleData(readyData);

            // Remove outcome and create outcome array with that data
            let outcome = shuffled.map(each => {
                each.map(dataset => { // Remove name
                    dataset.shift();
                })
                return each.map(dataset => { // Remove outcome 
                    return [dataset.shift() === 'Loss' ? 0 : 1];
                })
            })

            // Create 3d train data
            let trainData = shuffled.map(each => {
                return each.map(dataset => {
                    return dataset.map(point => {
                        return Math.round(point)
                    })
                })
            })

            return { trainData, outcome };
        }
    }
}

module.exports = WinLossRation;