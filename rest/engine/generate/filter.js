module.exports = (list, filter) => {
    let length = 0;

    // Selected fighters amount
    Object.keys(filter).map(fighter => {
        if (filter[fighter]) {
            length += 1;
        }
    })

    if (length <= 6) {
        // Only selected fighters
        return list.filter(card => {
            let count = 0, winCount = 0;

            card.fighters.map(fighter => {
                if (filter[fighter.name]) {
                    count += 1;
                }
                if (fighter.predict.outcome === 'Loss') {
                    winCount += 1;
                }
            })

            if (count === length && (winCount === 2 || winCount === 3 || winCount === 4)) {
                return card;
            }
        })
    } else {
        // If selected more than 6, generate avg combins
        return list.filter(card => {
            let count = 0;

            card.fighters.map(fighter => {
                if (filter[fighter.name]) {
                    count += 1;
                }
            })

            if (count !== 6) {
                return card;
            }
        })
    }
}