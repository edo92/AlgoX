const upcomingEvent = require('./upcomingEvent');
const draftEvent = require('./draftEvent');
const saveEvent = require('./saveEvent');

module.exports = { ...upcomingEvent, ...draftEvent, ...saveEvent };