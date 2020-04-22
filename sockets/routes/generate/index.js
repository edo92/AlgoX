const Combinatorics = require('js-combinatorics');

class Combinations {
    constructor() {
        this.pureCombins;
    }

    generate = (data) => {
        let list = data.list;
        let fgtrList = this.setOpponent(list);
        let pureCombins = this.combinations(fgtrList, 6);
        let cleanOpponent = this.cleanOpponent(pureCombins);
        let cleanCombins = this.cleanCombins(cleanOpponent);
        let strongCard = this.strongCard(cleanCombins);
    }

    setOpponent = (list) => { // Set opponent for each fighter
        let fighters = [];
        for (let each in list) {
            let fight = list[each];
            ['fighter1', 'fighter2'].map((fighter, i) => {
                fight[fighter].opponent = fight[`fighter${2 - i}`].name;
                fighters.push(fight[fighter]);
            })
        }
        return fighters;
    }

    combinations = (arr, size) => {
        let cards = [], cmb, a;
        cmb = Combinatorics.combination(arr, size);
        while (a = cmb.next()) cards.push(a);
        this.pureCombins = cards.length;
        return cards;
    }

    cleanCombins = list => {
        let cleanOppArr = [];
        for (let combin in list) {
            let card = list[combin];
            let cardObj = {}, size = 0, price = 0;

            for (let each in card) {
                let fighter = card[each];
                // Check if fighter and opponent is in one card
                cardObj[fighter.name] = (cardObj[fighter.name] || 0) + 1;
                cardObj[fighter.opponent] = (cardObj[fighter.opponent] || 0) + 1;

                // Count total card priceƒ
                price += Number(fighter.dk.price.split('$')[1]);
            }

            for (let j in cardObj) size++;

            if (size === 12 && price <= 50000) cleanOppArr.push(card);

        }
        return cleanOppArr;
    }

    strongCard = list => {
        
    }
}

module.exports = new Combinations;