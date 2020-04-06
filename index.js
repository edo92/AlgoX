const database = require('./DB');
const operation = require('./Data_Collection');

database.connect(() => {
    const page = 1;
    // Collects events and url to event page
    // let stageOne = new operation.operationOne(page);
    // stageOne.start();

    // Collects event fighters 
    // let stageTwo = new operation.operationTwo(page);
    // stageTwo.start();

    // Collects event fighters stats
    let stageThree = new operation.operationThree(page);
    stageThree.start();

    // Collect Fighters stats
    // let stageFour = new operation.operationFour(page);
    // stageFour.start();
});