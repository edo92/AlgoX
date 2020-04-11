const tf = require('@tensorflow/tfjs');
require("@tensorflow/tfjs-node");

class TrainData {
    getTrainedModel = async modelName => {
        return await tf.loadLayersModel(`file://./ML/train/${modelName}/model.json`);
    }

    trainData = async (data, modelName) => {
        const trinData = tf.tensor3d(data.trainData);
        const outcome = tf.tensor3d(data.outcome);

        const model = tf.sequential();

        model.add(tf.layers.dense({ units: 2, inputShape: [2, 24], activation: 'relu' }));
        model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));

        model.compile({
            optimizer: tf.train.adam(),
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy']
        })

        await model.fit(trinData, outcome, {
            epochs: 100
        })

        await model.save(`file://./ML/train/${modelName}`);

        console.log('Model data has been saved')
    }
}

module.exports = new TrainData;