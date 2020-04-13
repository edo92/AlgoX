const tf = require('@tensorflow/tfjs');
require("@tensorflow/tfjs-node");

class Predict {
    predict = async (model, predictData) => {
        const predict = tf.tensor3d(predictData);
        return await model.predict(predict).array();
    }
}

module.exports = new Predict;