const Combinatorics = require('js-combinatorics');

module.exports = dataArr => {
    let fightList = setOpponent(dataArr);
    let cards = combinations(fightList);
    let combins = cleanCombins(cards);
    return combins;
}

function cleanCombins(list) {
    let cleanOppArr = [];
    for (let combin in list) {
        let card = list[combin];
        let cardObj = {}, size = 0, price = 0, excl = 0;

        for (let each in card) {
            let fighter = card[each];

            // Selection
            excl += fighter.select === 'exclude' ? 1 : 0;

            // Check if fighter and opponent is in same card
            cardObj[fighter.name] = (cardObj[fighter.name] || 0) + 1;
            cardObj[fighter.opponent] = (cardObj[fighter.opponent] || 0) + 1;

            // Count total card price
            let pricePoint = fighter.dk.price;

            // Split not standart price value
            if (typeof pricePoint !== 'number') {
                if (pricePoint.split('$')[1]) {
                    price += Number(pricePoint.split('$')[1]);
                }
                else {
                    let x = pricePoint.split('$')[0].split(',');
                    price += Number(x[0] + x[1]);
                }
            } else {
                price += pricePoint;
            }
        }

        for (let j in cardObj) size++;
        if (!excl && size === 12 && price <= 50000) cleanOppArr.push(card);
    }
    return cleanOppArr;
}

function setOpponent(list) {
    let fighters = [];
    for (let each in list) {
        let fight = list[each];

        // Set opponent for each fighter
        ['fighter1', 'fighter2'].map((fighter, i) => {
            fight[fighter].opponent = fight[`fighter${2 - i}`].name;
            fighters.push(fight[fighter]);
        })
    }
    return fighters;
}


function combinations(list) {
    const size = 6;
    let cards = [], cmb, a;
    cmb = Combinatorics.combination(list, size);
    while (a = cmb.next()) cards.push(a);
    return cards;
}