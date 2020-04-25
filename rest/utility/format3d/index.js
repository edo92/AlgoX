class Format3D {
    convert3d = (fightList, options) => {
        let dataset = fightList.dataset.map(fight => {
            return fight.map(fighter => {
                return Object.keys(fighter).map(data => {
                    return fighter[data];
                })
            })
        })

        // Shuffle if specified options
        if (options.shuffle) {
            dataset = this.shuffle(dataset);
        }

        let name = dataset.map(fight => {
            return fight.map(fighter => {
                return [fighter.shift()];
            })
        })

        let outcome = dataset.map(fight => {
            return fight.map(fighter => {
                return [fighter.shift() === 'Loss' ? 0 : 1];
            })
        })

        let config = fightList.config;

        return { dataset, outcome, name, config };
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
}

module.exports = new Format3D;