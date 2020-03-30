const stageOne = require('./stageOne');
const stageTwo = require('./stageTwo');
const stageThree = require('./stageThree');
const stageFour = require('./stageFour');

module.exports = { ...stageOne, ...stageTwo, ...stageThree, ...stageFour };