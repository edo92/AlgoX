const Data = require('./data');

const tf = require('@tensorflow/tfjs');
require("@tensorflow/tfjs-node");

class DeepLearning extends Data {
    constructor() {
        super()

        this.state = [];
    }

    start = async () => {
        let data = await this.prepareData();
        this.trainConfiguration(data);
    }

    trainConfiguration = data => {
        const trinData = tf.tensor3d(data.data);

        const outcome = tf.tensor3d(data.outcome);

        const predict = tf.tensor3d([data.data[1]]);

        const model = tf.sequential();

        model.add(tf.layers.dense({ units: 1, inputShape: [2, 17], activation: 'tanh' }))
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }))
        model.compile({ optimizer: tf.train.adam(.06), loss: 'meanSquaredError', lr: 0.1 })

        model.fit(trinData, outcome, {
            batchSize: 1,
            epochs: 1000
        })
            .then((resp) => {
                model.predict(predict).print();
            })
            .catch(err => {
                throw err;
            })

    }
}

let test = new DeepLearning;
test.start();