const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

class Test {
    backtest = async (model, dataset) => {
        const predict = tf.tensor3d(dataset.dataset);
        const predicted = await model.predict(predict).array();

        let total = predicted.length;
        let backTest = 0;

        for (let each in predicted) {
            let firstOne = predicted[each][0][0]
            let firstTwo = predicted[each][1][0]

            let result = null;
            if (firstOne < firstTwo) {
                result = { firstWin: true };
            }
            else {
                result = { secondWin: true };
            }

            if (result.firstWin && dataset.outcome[each][0][0] === 1) {
                backTest += 1
            }
            else if (result.secondWin && dataset.outcome[each][1][0] === 1) {
                backTest += 1
            }
        }

        return { btAcc: Number((backTest / total).toFixed(2)) };
    }
}

module.exports = Test;