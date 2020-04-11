const tf = require('@tensorflow/tfjs');
require("@tensorflow/tfjs-node");

class Predict {
    predict = async (model, predictData) => {
        const predict = tf.tensor3d(predictData);

        let test = await model.predict(predict).array();
        console.log('test', test)
    }
}

module.exports = new Predict;