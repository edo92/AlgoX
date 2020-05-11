module.exports = list => {
    return strongOpp(list);
}

function strongOpp(list) {
    let newList = [];
    let fgtr = {};

    list.map(card => {
        let { fppf, predict } = card.config;
        let strCount = 0;

        card.fighters.map(fighter => {
            if (fighter.predict.outcome === 'Win') {
                strCount += 1
            }
        })

        if (strCount === 3) {
            newList.push(card);
        }
    })

    newList.map(card => {
        card.fighters.map(fighter => {
            if (!fgtr[fighter.name]) {
                fgtr[fighter.name] = 0;
            }
            fgtr[fighter.name] += 1;
        })
    })
    getInfo(newList);
    return newList;
}

function getInfo(list) {
    let test = {
        count: 0
    };
    list.map(item => {
        if (!test[item.config.real]) {
            test[item.config.real] = { count: 0 };
        }
        test[item.config.real].count += 1;
    })

    console.log('list', test)
    console.log('size', list.length)
}

function testing(list) {

}