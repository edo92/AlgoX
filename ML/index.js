const Data = require('./data');

const tf = require('@tensorflow/tfjs');
require("@tensorflow/tfjs-node");

class DeepLearning extends Data {
    constructor() {
        super()

        this.state = [];
    }

    predict = async data => {
        this.trainConfiguration(data);
    }

    trainConfiguration = data => {
        const trinData = tf.tensor3d(data.trainData);
        const outcome = tf.tensor3d(data.outcome);
        const predict = tf.tensor3d([data.trainData[11]]);

        const model = tf.sequential();

        model.add(tf.layers.dense({
            units: 1, activation: 'relu', inputShape: [2, 24]
        }));

        model.add(tf.layers.dense({ units: 1 }));

        model.compile({
            loss: 'meanSquaredError',
            optimizer: tf.train.sgd(0.000001),
            metrics: ['MAE']
        });

        model.fit(trinData, outcome, {
            batchSize: 64,
            epochs: 1000,
            validation_split: 0.2,
        })
            .then((resp) => {
                model.predict(predict).print();
            })
            .catch(err => {
                throw err;
            })
    }
}

module.exports = DeepLearning;