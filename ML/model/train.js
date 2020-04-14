
class Train {
    trainModel = async (data, modelName) => {
        const trinData = this.tf.tensor3d(data.trainData);
        const outcome = this.tf.tensor3d(data.outcome);

        const model = this.tf.sequential();

        model.add(this.tf.layers.dense({ units: 24, inputShape: [2, 24], activation: 'sigmoid' }));
        model.add(this.tf.layers.dense({ units: 8, activation: 'sigmoid' }));
        model.add(this.tf.layers.dense({ units: 2, activation: 'softmax' }));

        await model.compile({
            optimizer: this.tf.train.adam(),
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy'],
        })

        await model.fit(trinData, outcome, {
            epochs: 100
        })

        await model.save(`${this.modelPath}/${modelName}-model`);
        console.log('Model data has been saved')
    }
}

module.exports = Train;