const Data = require('./data');

class DeepLearning extends Data {
    constructor() {
        super()
    }

    start() {
        this.testData();
    }
}

let test = new DeepLearning;
test.start();