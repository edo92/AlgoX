
class AnalizeData {
    analizeModel = async (data, actions) => {
        this.analize(data, actions);
        // this.analize(data, actions);
    }

    analize = async (dataModel, actions) => {
        for (let i in dataModel.outcome) {
            let prediction = await actions.prediction([dataModel.trainData[i]]);
            let outcome = dataModel.outcome[i];

            let firstOne = prediction[0][0][0];
            let firstTwo = prediction[0][1][0];
            let firstWin = outcome[0][0] === 1;

            let result = null;
            if (firstWin) {
                if (firstOne < firstTwo) {
                    result = true
                }
                else {
                    result = false
                }
            }
            else {
                if (firstOne > firstTwo) {
                    result = true
                }
                else {
                    result = false
                }
            }

            console.log('----------------------')
            console.log('outcome', outcome)
            console.log('prediction', prediction)
            console.log('is Correct', result)
            console.log('======================')
        }
    }
}

module.exports = new AnalizeData;