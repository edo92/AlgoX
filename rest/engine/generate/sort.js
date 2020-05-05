module.exports = list => {
    let test = strongOpp(list);
}

function strongOpp(list) {
    let newList = [];
    let fgtr = {};

    list.map(card => {
        let { fppf, predict } = card.config;
        let strCount = 0;

        card.fighters.map(fighter => {
            if (fighter.predict.strength >= 19 && fighter.predict.outcome === 'Win') {
                strCount += 1
            }
        })

        if (strCount >= 5 && predict >= 5) {
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
}

function getInfo(list) {
    let test = {
        count: 0
    };
    list.map(item => {
        if (!test[item.config.real]) {
            test[item.config.real] = { count: 0 };
        }
        test[item.config.real].count += item.config.real;
    })

    console.log('list', test)
    console.log('size', list.length)
}

function testing(list) {

}