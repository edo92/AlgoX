
class Train {
    constructor() {
        this.results = {};
    }

    trainModel = async dataset => {
        const shapeY = dataset.config.points;
        const shapeX = 2;

        const trinData = this.tf.tensor3d(dataset.dataset);
        const outcome = this.tf.tensor3d(dataset.outcome);

        const model = this.tf.sequential();
        console.log('config', this.config)
        model.add(this.tf.layers.dense({ units: this.config.layer1, inputShape: [shapeX, shapeY], activation: 'sigmoid' }));
        model.add(this.tf.layers.dense({ units: this.config.layer2, activation: 'sigmoid' }));
        model.add(this.tf.layers.dense({ units: this.config.layer3, activation: 'softmax' }));

        await model.compile({
            optimizer: this.tf.train.adam(),
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy'],
        })

        const onBatchEnd = (none, data) => {
            this.trackProgress({ train: { ...data } });
            this.results = data;
        }
        await model.fit(trinData, outcome, {
            epochs: this.config.epochs,
            callbacks: { onBatchEnd }
        })

        await model.save(`${this.modelPath}/${this.config.modelName}-model`);
        return this.results;
    }
}

module.exports = Train;