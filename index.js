const collection = require('./DK_Collection');

class DK_Collection {
    constructor() {
        this.event = 'UFC Fight Night: Lee vs. Oliveira';
    }
    start = () => {
        let operation = new collection(this.event);
        operation.start();
    }
}

let data = new DK_Collection;
data.start();