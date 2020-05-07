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
            let count = 0;

            card.fighters.map(fighter => {
                if (filter[fighter.name]) {
                    count += 1;
                }
            })

            if (count === length) {
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

            if (count === 6) {
                return card;
            }
        })
    }
}