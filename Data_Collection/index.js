const database = require('./../DB');

const operationOne = require('./operation/stageOne');
const operationTwo = require('./operation/stageTwo');
const operationThree = require('./operation/stageThree');
const operationFour = require('./operation/stageFour');

database.connect(() => {
    const page = 1;
    // Collects events and url to event page
    // let stageOne = new operationOne(page);
    // stageOne.start();

    // Collects event fighters 
    // let stageTwo = new operationTwo(page);
    // stageTwo.start();

    // Collects event fighters stats
    // let stageThree = new operationThree(page);
    // stageThree.start();

    // Collect Fighters stats
    let stageFour = new operationFour(page);
    stageFour.start();
});