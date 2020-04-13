const tf = require('@tensorflow/tfjs');
require("@tensorflow/tfjs-node");

class TrainData {
    getTrainedModel = async modelName => {
        return await tf.loadLayersModel(`file://./ML/train/${modelName}-model/model.json`);
    }

    trainData = async (data, modelName) => {
        const trinData = tf.tensor3d(data.trainData);
        const outcome = tf.tensor3d(data.outcome);

        const model = tf.sequential();

        model.add(tf.layers.dense({ units: 24, inputShape: [2, 24], activation: 'sigmoid' }));
        model.add(tf.layers.dense({ units: 8, activation: 'sigmoid' }));
        model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));

        await model.compile({
            optimizer: tf.train.adam(),
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy'],
        })

        await model.fit(trinData, outcome, {
            epochs: 100
        })

        await model.save(`file://./ML/train/${modelName}-model`);



        console.log('Model data has been saved')
    }
}

module.exports = new TrainData;