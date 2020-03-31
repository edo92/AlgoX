const database = require('./../DB');

const operationOne = require('./operation/stageOne');
const operationTwo = require('./operation/stageTwo');

database.connect(() => {
    const page = 1;
    // Collects events and url to event page
    // let stageOne = new operationOne(page);
    // stageOne.start();

    // Collects event fighters 
    let stageTwo = new operationTwo(page);
    stageTwo.start();

    // Collects event fighters stats
    // operation.stageThree();

    // Collect Fighters stats
    // operation.stageFour();
});