require('dotenv').config();

const database = require('./db');
const operation = require('./operation');

database.connect(() => {
    // Collects events and url to event page
    // operation.stageOne();

    // Collects event fighters 
    // operation.stageTwo();

    // Collects event fighters stats
    operation.stageThree();
});