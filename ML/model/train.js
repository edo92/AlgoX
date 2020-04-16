
class Train {
    trainModel = async (dataset) => {
        const shapeY = dataset.config.points;
        const shapeX = 2;

        const trinData = this.tf.tensor3d(dataset.dataset);
        const outcome = this.tf.tensor3d(dataset.outcome);

        const model = this.tf.sequential();

        model.add(this.tf.layers.dense({ units: 34, inputShape: [shapeX, shapeY], activation: 'sigmoid' }));
        model.add(this.tf.layers.dense({ units: 12, activation: 'sigmoid' }));
        model.add(this.tf.layers.dense({ units: 2, activation: 'softmax' }));

        await model.compile({
            optimizer: this.tf.train.adam(),
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy'],
        })

        await model.fit(trinData, outcome, {
            epochs: 100
        })

        await model.save(`${this.modelPath}/${dataset.config.type}-model`);
        console.log('Model data has been saved')
    }
}

module.exports = Train;