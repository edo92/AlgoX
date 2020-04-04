const Data = require('./data');

class DeepLearning extends Data {
    constructor() {
        super()
    }

    start = async () => {
        let dataList = await this.prepareData();
    }
}

let test = new DeepLearning;
test.start();