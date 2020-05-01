const fs = require('fs');
const rimraf = require('rimraf');

const db = require('../../../db');
const util = require('../../utility');

class Dataset {
    constructor() {
        this.filePath = 'rest/engine/dataset/datasets/';
    }

    create = async (req, send) => {
        let set = await util.dataset.constractRawDataset({ list: 'all' });
        let dataset = await util.convert.convert3d(set);
        this.save(dataset, req.body.config);

        let newDatalist = await db.models.Dataset.find();
        return send({ datasets: newDatalist });
    }

    save = async (dataset, config) => {
        await db.models.Dataset.create({ ...dataset.info, ...config });

        const filePath = `${this.filePath}${config.datasetName}.json`;
        let json = JSON.stringify(dataset);

        // Save file as json
        fs.writeFile(filePath, json, err => {
            if (err) throw err;
            console.log(config.datasetName + ' Model Saved');
        })
    }

    get = async id => {
        try {
            let config = await db.models.Dataset.findOne({ _id: id });
            let dataset = await require(`./datasets/${config.datasetName}.json`);
            return { dataset, config };
        }
        catch (err) { throw err };
    }

    remove = async (req, send) => {
        let { id } = req.params;
        let dataset = await db.models.Dataset.findOneAndDelete({ _id: id });

        const file = `${this.filePath}/${dataset.datasetName}.json`;
        rimraf(file, res => { console.log('Dataset removed') });
        return send({ success: true });
    }
}

module.exports = new Dataset;