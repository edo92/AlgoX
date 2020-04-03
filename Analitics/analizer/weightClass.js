class Analizer {
    constructor() {
        this.analize = {
            finish: 0
        };
    }

    byWeightClass = async fightList => {
        await fightList.map(fight => {
            if (!this.analize[fight.weightClass]) {
                this.analize[fight.weightClass] = {
                    total: 0, finish: 0, hight: 0, age: {},
                    stance: {}, reach: {}, weight: {}, hight: {},
                    strAcc: {}, strDef: {},
                    highStrAccWins: 0, lowStrAccWins: 0, lowStrDefWins: 0, highStrDefWins: 0,
                    lognReachWin: 0, shortReachWin: 0, tallWins: 0, shortWins: 0,
                    youngWin: 0, oldWin: 0, lightWins: 0, heavyWins: 0
                };
            };

            this.countTotalFights(fight);

            // If fight finished early in the weightclass
            if (fight.method !== 'U-DEC' && fight.method !== 'S-DEC') {
                this.countEarlyFinish(fight);
                this.strikAccurancy(fight);
                this.countByWeight(fight);
                this.countByStance(fight);
                this.strikDefence(fight);
                this.countByHight(fight);
                this.countByReach(fight);
                this.countByAge(fight);
            }
        })
        console.log(this.analize)
    }


    countTotalFights = fight => {
        // count total fights in the weightclass
        this.analize[fight.weightClass].total = (this.analize[fight.weightClass].total || 0) + 1;
    }

    countEarlyFinish = fight => {
        // Count early finishes in each weightclass
        this.analize[fight.weightClass].finish = (this.analize[fight.weightClass].finish || 0) + 1;
    }

    countByStance = fight => {
        // Count early finished by stances
        let f1Stance = fight.fighter1.record.stats.stance;
        this.analize[fight.weightClass].stance[f1Stance] = (this.analize[fight.weightClass].stance[f1Stance] || 0) + 1;

        let f2Stance = fight.fighter2.record.stats.stance;
        this.analize[fight.weightClass].stance[f2Stance] = (this.analize[fight.weightClass].stance[f2Stance] || 0) + 1;
    }

    countByAge = fight => {
        let year = new Date().getFullYear();

        let f1Age = year - (Number(fight.fighter1.record.stats.dob.split(' ')[2]));
        this.analize[fight.weightClass].age[f1Age] = (this.analize[fight.weightClass].age[f1Age] || 0) + 1;

        let f2Age = year - (Number(fight.fighter2.record.stats.dob.split(' ')[2]));
        this.analize[fight.weightClass].age[f2Age] = (this.analize[fight.weightClass].age[f2Age] || 0) + 1;

        // Young old 
        if (Math.abs(f1Age - f2Age) >= 4) {
            this.analize[fight.weightClass].oldWin = (this.analize[fight.weightClass].oldWin || 0) + 1;
        }
        else {
            this.analize[fight.weightClass].youngWin = (this.analize[fight.weightClass].oldWin || 0) + 1;
        }
    }

    countByReach = fight => {
        let f1Reach = Number(fight.fighter1.record.stats.reach.split('"')[0]);
        let f2Reach = Number(fight.fighter2.record.stats.reach.split('"')[0]);

        this.analize[fight.weightClass].reach[f1Reach] = (this.analize[fight.weightClass].reach[f1Reach] || 0) + 1;
        this.analize[fight.weightClass].reach[f2Reach] = (this.analize[fight.weightClass].reach[f2Reach] || 0) + 1;

        if (f1Reach > f2Reach) {
            this.analize[fight.weightClass].lognReachWin = (this.analize[fight.weightClass].lognReachWin || 0) + 1;
        }
        else {
            this.analize[fight.weightClass].shortReachWin = (this.analize[fight.weightClass].shortReachWin || 0) + 1;
        }
    }

    countByWeight = fight => {
        let f1Weight = Number(fight.fighter1.record.stats.weight.split('lbs.')[0]);
        let f2Weight = Number(fight.fighter2.record.stats.weight.split('lbs.')[0]);

        this.analize[fight.weightClass].weight[f1Weight] = (this.analize[fight.weightClass].weight[f1Weight] || 0) + 1;
        this.analize[fight.weightClass].weight[f2Weight] = (this.analize[fight.weightClass].weight[f2Weight] || 0) + 1;

        if (f1Weight > f2Weight) {
            this.analize[fight.weightClass].heavyWins = (this.analize[fight.weightClass].heavyWins || 0) + 1;
        }
        else {
            this.analize[fight.weightClass].lightWins = (this.analize[fight.weightClass].lightWins || 0) + 1;
        }
    }

    countByHight = fight => {
        let f1Hight = fight.fighter1.record.stats.hight.split(' ');
        f1Hight = Number(f1Hight[0].split("'")[0] + '.' + f1Hight[1].split('"')[0]);

        let f2Hight = fight.fighter2.record.stats.hight.split(' ');
        f2Hight = Number(f2Hight[0].split("'")[0] + '.' + f2Hight[1].split('"')[0]);


        this.analize[fight.weightClass].hight[f1Hight] = (this.analize[fight.weightClass].hight[f1Hight] || 0) + 1;
        this.analize[fight.weightClass].hight[f2Hight] = (this.analize[fight.weightClass].hight[f2Hight] || 0) + 1;

        if (f1Hight > f2Hight) {
            this.analize[fight.weightClass].tallWins = (this.analize[fight.weightClass].tallWins || 0) + 1;
        }
        else {
            this.analize[fight.weightClass].shortWins = (this.analize[fight.weightClass].shortWins || 0) + 1;
        }
    }

    strikAccurancy = fight => {
        let f1StrAcc = Number(fight.fighter1.record.stats.StrAcc.split('%')[0]);
        let f2StrAcc = Number(fight.fighter2.record.stats.StrAcc.split('%')[0]);

        this.analize[fight.weightClass].strAcc[f1StrAcc] = (this.analize[fight.weightClass].strAcc[f1StrAcc] || 0) + 1;
        this.analize[fight.weightClass].strAcc[f2StrAcc] = (this.analize[fight.weightClass].strAcc[f2StrAcc] || 0) + 1;

        if (f1StrAcc > f2StrAcc) {
            this.analize[fight.weightClass].highStrAccWins = (this.analize[fight.weightClass].highStrAccWins || 0) + 1;
        }
        else {
            this.analize[fight.weightClass].lowStrAccWins = (this.analize[fight.weightClass].lowStrAccWins || 0) + 1;
        }
    }

    strikDefence = fight => {
        let f1StrDef = Number(fight.fighter1.record.stats.StrDef.split('%')[0]);
        let f2StrDef = Number(fight.fighter2.record.stats.StrDef.split('%')[0]);

        this.analize[fight.weightClass].strDef[f1StrDef] = (this.analize[fight.weightClass].strDef[f1StrDef] || 0) + 1;
        this.analize[fight.weightClass].strDef[f2StrDef] = (this.analize[fight.weightClass].strDef[f2StrDef] || 0) + 1;

        if (f1StrDef > f2StrDef) {
            this.analize[fight.weightClass].highStrDefWins = (this.analize[fight.weightClass].highStrDefWins || 0) + 1;
        }
        else {
            this.analize[fight.weightClass].lowStrDefWins = (this.analize[fight.weightClass].lowStrDefWins || 0) + 1;
        }
    }
}

module.exports = new Analizer;