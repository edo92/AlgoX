const fs = require('fs');
const WL = require('./wl');

class CreateDataModel {
    constructor(rawData) {
        this.data = rawData
    }

    createWL = async (rawData) => {
        let wlModel = new WL(rawData);
        let model = wlModel.createWLData();
        this.saveModelData('wl', model);
    }

    getModel = model => {
        return require(`./${model}.json`)
    }

    saveModelData = (name, model) => {
        // Stringify model data save in models folder
        const modelJson = JSON.stringify(model);
        const path = `ML/models/${name}.json`;

        fs.writeFile(path, modelJson, err => {
            if (err) throw err;
            console.log(name + ' Model Saved');
        })
    }
}

module.exports = new CreateDataModel;