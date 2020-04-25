const fs = require('fs');
const rimraf = require('rimraf');

const db = require('../../../db');
const util = require('../../utility');

class Dataset {
    constructor() {
        this.filePath = 'rest/engine/dataset/datasets/';
    }

    create = async (req, send) => {
        let config = req.body.config;

        let fights = await util.pipline.calculateFightAverage({ all: true });
        let dataset = await util.custome.dataset(fights, {});

        try {
            let dtObject = await db.models.Dataset.create({ ...req.body.config, ...dataset.info });
            let newData = await db.models.Dataset.find();

            this.save(dataset.dataset, dtObject);
            send({ datasets: newData });
        }
        catch (err) { throw err };
    }

    save = (dataset, config) => {
        const filePath = `${this.filePath}${config._id}.json`;
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
            let dataset = await require(`./datasets/${id}.json`);
            return { dataset, config };
        }
        catch (err) { throw err };
    }

    remove = async (req, send) => {
        let { id } = req.params;
        const file = `${this.filePath}/${id}.json`;
        rimraf(file, async res => {
            try {
                await db.models.Dataset.findOneAndDelete({ _id: id });
                send({ success: true });
            }
            catch (err) { throw err };
        });
    }
}

module.exports = new Dataset;