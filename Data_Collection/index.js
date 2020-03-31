const database = require('./../DB');
const operation = require('./operation');

const operationOne = require('./operation/stageOne');

database.connect(() => {
    const page = 1;
    // Collects events and url to event page
    let stageOne = new operationOne(page);
    stageOne.start();

    // Collects event fighters 
    // operation.stageTwo();

    // Collects event fighters stats
    // operation.stageThree();

    // Collect Fighters stats
    // operation.stageFour();
});