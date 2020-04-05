class Actions {
    constructor() {
        this.getRawFightList = async () => {
            let fightersList = await this.getFightList();

            await fightersList.map(fight => {
                this.fighterReach(fight);
                this.fighterAge(fight);
                this.fighterWeight(fight);
                this.fighterHeight(fight);
                this.strikAccurancy(fight);
                this.strikDefence(fight);
                this.record(fight);
                this.SLpM(fight);
                this.SApM(fight);
                this.TDAvg(fight);
                this.TDAcc(fight);
                this.TDDef(fight);
                this.SubAvg(fight);
                this.dkStats(fight);
            })

            return fightersList;
        }
    }

    record = fight => {
        let f1Record = fight.fighter1.record.stats.record.split('-');
        fight.fighter1.record.stats.wins = Number(f1Record[0].trim());
        fight.fighter1.record.stats.losses = Number(f1Record[1]);
        delete fight.fighter1.record.stats.record;

        let f2Record = fight.fighter2.record.stats.record.split('-');
        fight.fighter2.record.stats.wins = Number(f2Record[0].trim());
        fight.fighter2.record.stats.losses = Number(f2Record[1]);
        delete fight.fighter2.record.stats.record;
    }

    fighterReach = fight => {
        // Fighters Reach
        let f1Reach = Number(fight.fighter1.record.stats.reach.split('"')[0]);
        let f2Reach = Number(fight.fighter2.record.stats.reach.split('"')[0]);
        // Mutate original fight
        fight.fighter1.record.stats.reach = f1Reach;
        fight.fighter2.record.stats.reach = f2Reach;
    }

    fighterAge = fight => {
        let year = new Date().getFullYear();

        let f1Age = year - (Number(fight.fighter1.record.stats.dob.split(' ')[2]));
        let f2Age = year - (Number(fight.fighter2.record.stats.dob.split(' ')[2]));

        // Mutate original fight
        fight.fighter1.record.stats.dob = f1Age;
        fight.fighter2.record.stats.dob = f2Age;
    }

    fighterWeight = fight => {
        let f1Weight = Number(fight.fighter1.record.stats.weight.split('lbs.')[0]);
        let f2Weight = Number(fight.fighter2.record.stats.weight.split('lbs.')[0]);

        fight.fighter1.record.stats.weight = f1Weight;
        fight.fighter2.record.stats.weight = f2Weight;
    }

    fighterHeight = fight => {
        let f1Hight = fight.fighter1.record.stats.hight.split(' ');
        f1Hight = Number(f1Hight[0].split("'")[0] + '.' + f1Hight[1].split('"')[0]);

        let f2Hight = fight.fighter2.record.stats.hight.split(' ');
        f2Hight = Number(f2Hight[0].split("'")[0] + '.' + f2Hight[1].split('"')[0]);

        // Mutate original fight
        fight.fighter1.record.stats.hight = f1Hight;
        fight.fighter2.record.stats.hight = f2Hight;
    }

    strikAccurancy = fight => {
        let f1StrAcc = Number(fight.fighter1.record.stats.StrAcc.split('%')[0]);
        let f2StrAcc = Number(fight.fighter2.record.stats.StrAcc.split('%')[0]);

        // Mutate original fight
        fight.fighter1.record.stats.StrAcc = f1StrAcc;
        fight.fighter2.record.stats.StrAcc = f2StrAcc;
    }

    strikDefence = fight => {
        let f1StrDef = Number(fight.fighter1.record.stats.StrDef.split('%')[0]);
        let f2StrDef = Number(fight.fighter2.record.stats.StrDef.split('%')[0]);

        // Mutate original fight
        fight.fighter1.record.stats.StrDef = f1StrDef;
        fight.fighter2.record.stats.StrDef = f2StrDef;
    }

    SLpM = fight => {
        let f1Slpm = fight.fighter1.record.stats.SLpM;
        let f2Slpm = fight.fighter2.record.stats.SLpM;

        fight.fighter1.record.stats.SLpM = Number(f1Slpm);
        fight.fighter2.record.stats.SLpM = Number(f2Slpm);
    }

    SApM = fight => {
        let f1SApM = fight.fighter1.record.stats.SApM;
        let f2SApM = fight.fighter2.record.stats.SApM;

        fight.fighter1.record.stats.SApM = Number(f1SApM);
        fight.fighter2.record.stats.SApM = Number(f2SApM);
    }

    TDAvg = fight => {
        let f1TDAvg = fight.fighter1.record.stats.TDAvg;
        let f2TDAvg = fight.fighter2.record.stats.TDAvg;

        fight.fighter1.record.stats.TDAvg = Number(f1TDAvg);
        fight.fighter2.record.stats.TDAvg = Number(f2TDAvg);
    }

    TDAcc = fight => {
        let f1TDAcc = fight.fighter1.record.stats.TDAcc.split('%')[0];
        let f2TDAcc = fight.fighter2.record.stats.TDAcc.split('%')[0];

        fight.fighter1.record.stats.TDAcc = Number(f1TDAcc);
        fight.fighter2.record.stats.TDAcc = Number(f2TDAcc);
    }

    TDDef = fight => {
        let f1TDDef = fight.fighter1.record.stats.TDDef.split('%')[0];
        let f2TDDef = fight.fighter2.record.stats.TDDef.split('%')[0];

        fight.fighter1.record.stats.TDDef = Number(f1TDDef);
        fight.fighter2.record.stats.TDDef = Number(f2TDDef);
    }

    SubAvg = fight => {
        let f1SubAvg = fight.fighter1.record.stats.SubAvg.split('%')[0];
        let f2SubAvg = fight.fighter2.record.stats.SubAvg.split('%')[0];

        fight.fighter1.record.stats.SubAvg = Number(f1SubAvg);
        fight.fighter2.record.stats.SubAvg = Number(f2SubAvg);
    }

    dkStats = fight => {
        fight.fighter1.dk.fppf = Number(fight.fighter1.dk.fppf);
        fight.fighter2.dk.fppf = Number(fight.fighter2.dk.fppf);
    }
}

module.exports = Actions;