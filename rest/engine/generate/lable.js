module.exports = list => {
    let readyList = [];

    list.map(card => {
        let stats = { fppf: 0, strength: 0 };
        let test = { predict: 0, real: 0 };

        Object.keys(card).map(fighter => {
            const outcome = card[fighter].predict.outcome;
            const fppf = Number(card[fighter].dk.fppf);
            
            // stats
            stats.strength += card[fighter].predict.strength;
            stats.fppf += fppf ? fppf : 0;
            
            // test
            test.predict += outcome === 'Win' ? 1 : 0;

            if (card[fighter].outcome) {
                test.real += card[fighter].outcome === 'Win' ? 1 : 0;
            }
        })

        // get average 
        Object.keys(stats).map(each => {
            stats[each] = Math.round(stats[each] / 6);
        })

        readyList.push({ fighters: card, config: { ...stats, ...test } })
    })

    return readyList;
}