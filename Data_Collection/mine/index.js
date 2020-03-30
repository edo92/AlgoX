const events = require('./events');
const eventFights = require('./eventFights');
const fightStats = require('./fightStats');

module.exports = { ...events, ...eventFights, ...fightStats };