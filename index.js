const db = require('./DB');
const data = require('./Data');
const ML = require('./ML');

start();

async function start() {
    db.connect();

    const mlData = await data.getTrainData();

    let predict = new ML();
    predict.predict(mlData);
}