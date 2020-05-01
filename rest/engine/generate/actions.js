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
                if (pricePoint.split('$')[1]) {
                    price += Number(pricePoint.split('$')[1]);
                }
                else {
                    let x = pricePoint.split('$')[0].split(',');
                    price += Number(x[0] + x[1]);
                }
            }

            for (let j in cardObj) size++;
            if (!excl && size === 12 && price <= 50000) cleanOppArr.push(card);
        }
        return cleanOppArr;
    }

    countCombins = async list => {
        let readyList = [];
        let fgtr = {};

        list.map(card => {
            let stats = { fppf: 0, strength: 0 };
            let test = { predict: 0, real: 0 };
            let str = 0;

            Object.keys(card).map(fighter => {
                // Count fighters
                if (!fgtr[card[fighter].name]) {
                    fgtr[card[fighter].name] = 0;
                }
                fgtr[card[fighter].name] += 1;

                if (card[fighter].predict.strength >= 13) {
                    str += 1
                }

                //
                const fppf = Number(card[fighter].dk.fppf);
                const outcome = card[fighter].predict.outcome;

                // stats
                stats.strength += card[fighter].predict.strength;
                stats.fppf += fppf ? fppf : 0;

                // test
                test.predict += outcome === 'Win' ? 1 : 0;
                test.real += card[fighter].outcome === 'Win' ? 1 : 0;
            })

            // get average 
            Object.keys(stats).map(each => {
                stats[each] = Math.round(stats[each] / 6);
            })

            if (str > 3) {
                readyList.push({
                    fighters: card,
                    config: { ...stats, ...test }
                })
            }
        })

        return readyList;
    }

    detect = async (list) => {
        let test = [];
        let fgtr = {};

        list.map(card => {
            let { predict, fppf, strength, real } = card.config;

            if (predict >= 5 && fppf > 44) {
                card.fighters.map(fighter => {
                    // Count fighters
                    if (!fgtr[fighter.name]) {
                        fgtr[fighter.name] = 0;
                    }
                    fgtr[fighter.name] += 1;
                })

                test.push(card);
            }
        })

        let cleanList = [];
        test.map(card => {
            let num = 0;

            card.fighters.map(fighter => {
                if (fgtr[fighter.name] > 5) {
                    num += 1;
                }
            })

            if (num > 3) {
                cleanList.push(card)
            }
        })

        cleanList.map(item => {
            console.log('test', item.config)
        })
    }
}

module.exports = Actions;