class StageFour {
    constructor() {
        this.stageFour = fightList => {
           for(let fight in fightList){
               for(let each in fightList[fight]){
                   let fighter = fightList[fight][each]
                //    console.log('fighter',fighter)
               }
           }
        }
    }
}

module.exports = StageFour;