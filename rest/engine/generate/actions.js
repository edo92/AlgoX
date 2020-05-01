const Combinatorics = require('js-combinatorics');

class Actions {
    constructor() {

    }
    setOpponent = list => {
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

    combinations = (list, size) => {
        let cards = [], cmb, a;
        cmb = Combinatorics.combination(list, size);
        while (a = cmb.next()) cards.push(a);
        return cards;
    }

    cleanCombins = list => {
        let cleanOppArr = [];
        for (let combin in list) {
            let card = list[combin];
            let cardObj = {}, size = 0, price = 0;

            for (let each in card) {
                let fighter = card[each];
                // Check if fighter and opponent is in same card
                cardObj[fighter.name] = (cardObj[fighter.name] || 0) + 1;
                cardObj[fighter.opponent] = (cardObj[fighter.opponent] || 0) + 1;

                // Count total card price
                price += Number(fighter.dk.price.split('$')[1]);
            }

            for (let j in cardObj) size++;

            if (size === 12 && price <= 50000) cleanOppArr.push(card);

        }
        return cleanOppArr;
    }

    rateCombins = async list => {
        console.log('list', list)
    }
}

module.exports = Actions;