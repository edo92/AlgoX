// Constract trainData, outcome, ... upcomint events
class StageFour {
    constructor() {
        this.stageFour = async fightList => {
            // Constract train array
            let trainData = fightList.map(fight => {
                return Object.keys(fight).map(each => {
                    return Object.keys(fight[each]).map(stats => {
                        return fight[each][stats];
                    })
                })
            })

            let shuffledList = this.shuffleData(trainData);

            console.log('compare', shuffledList[11])

            // Constract outcome array
            let outcome = shuffledList.map(fight => {
                return fight.map(fighter => {
                    console.log('fighter',fighter)
                    fighter.shift();
                    return [fighter.shift() === 'Loss' ? 0 : 1];
                })
            })

            return { trainData, outcome };
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
}

module.exports = StageFour;