const db = require('../DB');

class Analitics {
    constructor() {
        this.start = async () => {
            this.fighters = {};
            this.analize = {};

            db.connect(async () => {

                await this.getFighterStats();

                await this.constract();

                console.log(this.analize)
            })
        }
    }

    getFighterStats = async () => {
        let fighterList = await db.db.Fighter.find();
        await fighterList.map(fighter => {
            this.fighters[fighter._id] = fighter;
        })
    }

    constract = async () => {
        let events = await db.actions.getEvents();

        await events.map(event => {
            event.fights.map(fight => {
                if (!this.analize[fight.weightClass]) {
                    this.analize[fight.weightClass] = {
                        total: 0, finish: 0, youngWin: 0, oldWin: 0,
                        stance: {}
                    };
                };

                // Count total
                this.analize[fight.weightClass].total = (this.analize[fight.weightClass].total) + 1;

                // Count fast finishes
                if (fight.method !== 'U-DEC' && fight.method !== 'S-DEC') {
                    this.constractFastFinish(fight);
                }
            })
        })
    }

    constractFastFinish = (fight) => {
        this.analize[fight.weightClass].finish = (this.analize[fight.weightClass].finish) + 1;

        let f1Dob = Number(this.fighters[fight.fighter1.fighterId].stats.dob.split(' ')[2]);
        let f2Dob = Number(this.fighters[fight.fighter2.fighterId].stats.dob.split(' ')[2]);

        let f1Stance = this.fighters[fight.fighter1.fighterId].stats.stance;
        this.analize[fight.weightClass].stance[f1Stance] = (this.analize[fight.weightClass].stance[f1Stance] || 0) + 1;
        
        if (f1Dob > f2Dob) {
            this.analize[fight.weightClass].youngWin = (this.analize[fight.weightClass].youngWin) + 1;
        }
        else {
            this.analize[fight.weightClass].oldWin = (this.analize[fight.weightClass].oldWin) + 1;
        }
    }
}

let analitics = new Analitics;
analitics.start();