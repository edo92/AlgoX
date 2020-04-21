const Combinatorics = require('js-combinatorics');

class Combinations {
    constructor() {
        this.pureCombins;
    }

    generate = (data) => {
        let list = data.list;
        let fgtrList = this.setOpponent(list);
        let combins = this.combinations(fgtrList, 6);

        console.log('combins', combins)
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
}

module.exports = new Combinations;