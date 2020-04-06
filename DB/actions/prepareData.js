class PrepareData {
    constructor() {
        this.getFightList = async () => {
            let allEvents = await this.getEvents();
            let allFighters = await this.getAllFighters({ obj: true });

            let performace = {};
            await allEvents.map(event => {
                event.fights.map(fight => {
                    ['fighter1', 'fighter2'].map(each => {
                        let fighter = fight[each];

                        if (!performace[fighter.name]) {
                            performace[fighter.name] = {
                                sigStrLanded: {}, kd: {},
                                sigStrTotal: {}, clinchSucc: {}, clinchAtt: {},
                                disSucc: {}, disAtt: {}, groundSucc: {}, groundAtt: {},
                                tdSucc: {}, tdAtt: {},
                            };
                        }

                        let ftrPerform = performace[fighter.name];

                        //kd
                        ftrPerform.kd.kd = (ftrPerform.kd.kd || 0) + Number(fighter.stats.kd);
                        ftrPerform.kd.total = (ftrPerform.kd.total || 0) + 1;

                        // Sig str
                        ftrPerform.sigStrLanded.sigStrLanded = (ftrPerform.sigStrLanded.sigStrLanded || 0) + Number(fighter.stats.strSig.split(' of ')[0]);
                        ftrPerform.sigStrLanded.total = (ftrPerform.sigStrLanded.total || 0) + 1;
                        // sig str total
                        ftrPerform.sigStrTotal.sigStrTotal = (ftrPerform.sigStrTotal.sigStrTotal || 0) + Number(fighter.stats.strSig.split(' of ')[1]);
                        ftrPerform.sigStrTotal.total = (ftrPerform.sigStrTotal.total || 0) + 1;

                        // Clinch succ
                        ftrPerform.clinchSucc.clinchSucc = (ftrPerform.clinchSucc.clinchSucc || 0) + Number(fighter.stats.clinch.split(' of ')[0]);
                        ftrPerform.clinchSucc.total = (ftrPerform.clinchSucc.total || 0) + 1;
                        // clinch att
                        ftrPerform.clinchAtt.clinchAtt = (ftrPerform.clinchAtt.clinchAtt || 0) + Number(fighter.stats.clinch.split(' of ')[1]);
                        ftrPerform.clinchAtt.total = (ftrPerform.clinchAtt.total || 0) + 1;

                        // distance succ
                        ftrPerform.disSucc.disSucc = (ftrPerform.disSucc.disSucc || 0) + Number(fighter.stats.distance.split(' of ')[0]);
                        ftrPerform.disSucc.total = (ftrPerform.disSucc.total || 0) + 1;
                        // distance att
                        ftrPerform.disAtt.disAtt = (ftrPerform.disAtt.disAtt || 0) + Number(fighter.stats.distance.split(' of ')[1]);
                        ftrPerform.disAtt.total = (ftrPerform.disAtt.total || 0) + 1;

                        // ground succ
                        ftrPerform.groundSucc.groundSucc = (ftrPerform.groundSucc.groundSucc || 0) + Number(fighter.stats.ground.split(' of ')[0]);
                        ftrPerform.groundSucc.total = (ftrPerform.groundSucc.total || 0) + 1;
                        // ground att
                        ftrPerform.groundAtt.groundAtt = (ftrPerform.groundAtt.groundAtt || 0) + Number(fighter.stats.distance.split(' of ')[1]);
                        ftrPerform.groundAtt.total = (ftrPerform.groundAtt.total || 0) + 1;

                        // takedown succ
                        ftrPerform.tdSucc.tdSucc = (ftrPerform.tdSucc.tdSucc || 0) + Number(fighter.stats.takeDown.split(' of ')[0]);
                        ftrPerform.tdSucc.total = (ftrPerform.tdSucc.total || 0) + 1;
                        // takedown att
                        ftrPerform.tdAtt.tdAtt = (ftrPerform.tdAtt.tdAtt || 0) + Number(fighter.stats.distance.split(' of ')[1]);
                        ftrPerform.tdAtt.total = (ftrPerform.tdAtt.total || 0) + 1;
                    })
                })
            })

            Object.keys(performace).map(item => {
                Object.keys(performace[item]).map(key => {
                    let count = performace[item][key][key];
                    let total = performace[item][key].total
                    performace[item][key] = count / total;
                })
            })

            let fighterList = [];
            await allEvents.map(event => {
                event.fights.map(fight => {
                    // Set record for every 2 fighters in the event
                    fight.fighter1.record = allFighters[fight.fighter1.name];
                    fight.fighter2.record = allFighters[fight.fighter2.name];

                    fight.fighter1.stats = performace[fight.fighter1.name];
                    fight.fighter2.stats = performace[fight.fighter2.name];

                    fighterList.push(fight);
                })
            })
            return fighterList
        }
    }
}

module.exports = PrepareData;