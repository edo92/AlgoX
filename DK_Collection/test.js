const vision = require('./readImage');

start();
async function start() {
    let test = await vision.readImage('images/UFC Fight Night: Lee vs. Oliveira/Screen Shot 2020-04-02 at 5.09.59 AM.png');
    console.log('test', test)
}
