const fs = require('fs');

const wl = require('./type-wl');
const qf = require('./type-qf');

class Dataset {
    createDataset = async (rawDataset, options) => {
        // Create wl type dataset, save if option
        wl.create(rawDataset, dataset => {
            if (options.save) {
                this.saveDataset(dataset, 'wl');
            }
        });

        // qf.create(rawDataset, dataset => {
            //  if (options.save) {
            // saveModelData(dataset, 'wl');
            // }
        // });
    }

    saveDataset = (dataset, name) => {
        const filePath = `ML/dataset/datasets/${name}.json`;
        let json = JSON.stringify(dataset);

        // Save file as json
        fs.writeFile(filePath, json, err => {
            if (err) throw err;
            console.log(name + ' Model Saved');
        })
    }

    getDataset = data => {
        return require(`./datasets/${data}.json`);
    }
}
module.exports = new Dataset;