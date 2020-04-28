const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

class Train {
    constructor(config) {
        this.config = config;

        this.results = {};
        this.count = 0;
        this.progress = 0;
        this.trackAcc = 0;
        this.loss = 0;
        this.acc = 0;
    }

    trainModel = async dataset => {
        const shapeY = dataset.config.dataPoints;
        const shapeX = 2;

        const trinData = tf.tensor3d(dataset.dataset);
        const outcome = tf.tensor3d(dataset.outcome);

        const model = tf.sequential();

        model.add(tf.layers.dense({ units: shapeX, inputShape: [shapeX, shapeY], activation: 'relu' }));
        model.add(tf.layers.dropout(0.5))
        model.add(tf.layers.dense({ units: this.config.layer1, activation: 'relu' }));
        model.add(tf.layers.dropout(0.5))
        model.add(tf.layers.dense({ units: this.config.layer2, activation: 'relu' }));
        model.add(tf.layers.dropout(0.5))
        model.add(tf.layers.dense({ units: this.config.layer3, activation: 'relu' }));


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

            if (this.trackAcc > 10) {
                this.trackAcc = 1;
                this.loss = 1;
                this.acc = 1;
            }

            this.results = {
                ...{ acc: Number((this.acc / this.trackAcc).toFixed(2)) },
                ...{ loss: Number((this.loss / this.trackAcc).toFixed(2)) },
                ...{ progress: Number((this.count / (this.config.epochs * 2)).toFixed(2)) }
            }
        }

        await model.fit(trinData, outcome, {
            epochs: this.config.epochs,
            callbacks: { onBatchEnd }
        })

        return { model: model, result: this.results };
    }
}

module.exports = Train;