const fs = require('fs');
const rimraf = require('rimraf');

class Dataset {
    constructor() {
        this.filePath = 'sockets/routes/ml/ml/dataset/datasets/';
    }

    createDataset = async (dataset, config) => {
        let { datasetName } = config;

        const filePath = `${this.filePath}${datasetName}.json`;
        let json = JSON.stringify(dataset);

        // Save file as json
        fs.writeFile(filePath, json, err => {
            if (err) throw err;
            console.log(config.datasetName + ' Model Saved');
        })
    }

    getDataset = name => {
        return require(`./datasets/${name}.json`);
    }

    deleteDataset = name => {
        const file = `${this.filePath}/${name}.json`;
        rimraf(file, res => {
            console.log('res', res)
        });
    }
}
module.exports = new Dataset;