const upcomingEvent = require('./upcomingEvent');
const draftEvent = require('./draftEvent');
const saveEvent = require('./saveEvent');
const dataLearning = require('./ml');

module.exports = { ...upcomingEvent, ...draftEvent, ...saveEvent, ...dataLearning };