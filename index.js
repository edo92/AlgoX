const database = require('./DB');
const operation = require('./Data_Collection');

class DataColection {
    constructor() {
        this.page = 1;
    }

    start = () => {
        database.connect(() => {
            // Collects events and url to event page
            // let stageOne = new operation.operationOne(this.page);
            // stageOne.start();

            // Collects event fighters 
            // let stageTwo = new operation.operationTwo(this.page);
            // stageTwo.start();

            // Collects event fighters stats
            let stageThree = new operation.operationThree(this.page);
            stageThree.start();

            // Collect Fighters stats
            // let stageFour = new operation.operationFour(this.page);
            // stageFour.start();
        });
    }
}

let mineData = new DataColection;
mineData.start();