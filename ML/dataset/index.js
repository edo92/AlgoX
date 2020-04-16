const fs = require('fs');

class Dataset {
    createDataset = async (dataset, name) => {
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