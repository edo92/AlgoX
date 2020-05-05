const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

class Train {
    constructor(config) {
        this.config = config;

        this.results = {};
        this.count = 0;
        this.trackAcc = 0;
        this.loss = 0;
        this.acc = 0;
    }

    trainModel = async dataset => {
        const shapeY = 36;
        const shapeX = 2;

        const trinData = tf.tensor3d(dataset.dataset);
        const outcome = tf.tensor3d(dataset.outcome);

        const model = tf.sequential();

        model.add(tf.layers.dense({ units: this.config.layer1, inputShape: [shapeX, shapeY], activation: 'sigmoid' }));
        model.add(tf.layers.dense({ units: this.config.layer2, activation: 'sigmoid' }));
        model.add(tf.layers.dense({ units: this.config.layer3, activation: 'softmax' }));

        await model.compile({
            optimizer: tf.train.adam(),
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy'],
        })

        const onBatchEnd = (none, data) => {
            this.count += 1;
            this.trackAcc += 1;
            this.acc += data.acc;
            this.loss += data.loss;

            if (this.trackAcc > 15) {
                this.trackAcc = 1;
                this.loss = 1;
                this.acc = 1;
            }

            this.results = {
                ...{ acc: Number((this.acc / this.trackAcc).toFixed(2)) },
                ...{ loss: Number((this.loss / this.trackAcc).toFixed(2)) },
            }
        }

        await model.fit(trinData, outcome, {
            epochs: this.config.epochs,
            shuffle: true,
            callbacks: { onBatchEnd }
        })

        return { model: model, result: this.results };
    }
}

module.exports = Train;