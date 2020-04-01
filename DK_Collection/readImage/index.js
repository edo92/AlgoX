const vision = require('@google-cloud/vision');
const positions = require('./positions');

class Constract {
    constructor() {

    }

    readImage = async dir => {
        const client = new vision.ImageAnnotatorClient();

        const [result] = await client.textDetection(dir);

        return positions(filterData(result.textAnnotations));

        function filterData(data) {
            let cleared = data.filter((item, i) => {
                if (item.description !== 'UFC' && item.description !== 'FIGHT' &&
                    item.description !== 'DK' && item.description !== 'PRICE' &&
                    item.description !== 'ODDS' && item.description !== 'VS' &&
                    item.description !== 'RECORD' && item.description !== 'FPPF' &&
                    item.description !== 'CC' && (i > 0)) {
                    return item.description;
                }
            })
            return cleared;
        }
    }
};

module.exports = new Constract;