const upcomingEvent = require('./upcomingEvent');
const saveEvent = require('./saveEvent');
const draft = require('./draftEvent');
const ml = require('./ml');
const generate = require('./generate');

module.exports = { ...upcomingEvent, draft, ...saveEvent, ml, generate };