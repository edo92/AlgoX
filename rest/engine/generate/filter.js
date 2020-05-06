module.exports = (list, filter) => {
    let length = 0;

    Object.keys(filter).map(fighter => {
        if (filter[fighter]) {
            length += 1;
        }
    })

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
}