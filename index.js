const db = require('./DB');
const collection = require('./DK_Collection');
require('dotenv').config();

class DK_Collection {
    constructor() {
        this.event = 'UFC Fight Night: Lee vs. Oliveira';
    }

    start = () => {
        db.connect(() => {
            let operation = new collection(this.event);
            operation.dkCollection();
        })
    }
}

let data = new DK_Collection;
data.start();