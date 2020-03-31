const events = require('./events');
const eventFights = require('./eventFights');
const fightStats = require('./fightStats');
const fighterStats = require('./fighterStats');

module.exports = { ...events, ...eventFights, ...fightStats, ...fighterStats };