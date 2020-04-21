
class Train {
    constructor() {
        this.results = {};
        this.count = 0;
        this.progress = 0;
        this.trackAcc = 0;
        this.loss = 0;
        this.acc = 0;
    }

    trainModel = async dataset => {
        const shapeY = dataset.config.points;
        const shapeX = 2;

        const trinData = this.tf.tensor3d(dataset.dataset);
        const outcome = this.tf.tensor3d(dataset.outcome);

        const model = this.tf.sequential();

        model.add(this.tf.layers.dense({ units: this.config.layer1, inputShape: [shapeX, shapeY], activation: 'sigmoid' }));
        model.add(this.tf.layers.dense({ units: this.config.layer2, activation: 'sigmoid' }));
        model.add(this.tf.layers.dense({ units: this.config.layer3, activation: 'softmax' }));

        await model.compile({
            optimizer: this.tf.train.adam(),
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

            this.trackProgress({ train: this.results });
        }

        await model.fit(trinData, outcome, {
            epochs: this.config.epochs,
            callbacks: { onBatchEnd }
        })

        await model.save(`${this.modelPath}/${this.config.modelName}-model`);
        this.trackProgress({ train: { creating: false } });
        return this.results;
    }
}

module.exports = Train;