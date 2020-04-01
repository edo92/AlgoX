const vision = require('@google-cloud/vision');
const positions = require('./positions');

class Constract {
    constructor() {

    }

    readImage = async dir => {
        const client = new vision.ImageAnnotatorClient();

        const [result] = await client.textDetection(dir);

        return positions(result.textAnnotations);
    }
};

module.exports = new Constract;