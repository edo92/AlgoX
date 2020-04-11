const db = require('./DB');
const ml = require('./ML');

start();

async function start() {
    db.connect();

    ml.predict();
}
