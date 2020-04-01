const vision = require('./readImage');

start();
async function start() {
    let test = await vision.readImage('images/UFC Fight Night: Lee vs. Oliveira/Screen Shot 2020-04-01 at 2.14.12 AM.png');
    console.log('test', test)
}
