const db = require('./DB');
const data = require('./Data');

db.connect();
data.start();