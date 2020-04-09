const vision = require('@google-cloud/vision');
const constract = require('./constract');

class Constract {
    constructor() {
        this.state = {};
    }

    readImage = async dir => {
        const client = new vision.ImageAnnotatorClient();
        const [result] = await client.textDetection(dir);

        let { imageText, type } = this.prepareData(result.textAnnotations);

        return await constract[type ? 'typeA' : 'typeB'](imageText);
    }

    prepareData = (imgTxt) => {
        let filtered = filterData(imgTxt);
        let type = detectImageType(filtered);

        return { imageText: filtered, type: type };

        function detectImageType(imgData) {
            if (imgData.length <= 40) return true;
            else if (imgData.length >= 80) return false;
        }

        function filterData(data) {
            let cleared = data.filter((item, i) => {
                if (item.description !== 'UFC' && item.description !== 'FIGHT' &&
                    item.description !== 'DK' && item.description !== 'PRICE' &&
                    item.description !== 'ODDS' && item.description !== 'VS' &&
                    item.description !== 'RECORD' && item.description !== 'FPPF' &&
                    item.description !== 'CC' && item.description !== '|' &&
                    item.description !== 'I|' && item.description !== 'I' &&
                    item.description !== 'Vs' &&
                    (i > 0)) {
                    return item.description;
                }
            })
            return cleared;
        }
    }

    getPosition = (position) => {
        let x = position.map(posX => { return posX.x });
        let y = position.map(posY => { return posY.y });
        return {
            minX: Math.min(...x),
            maxX: Math.max(...x),
            minY: Math.min(...y),
            maxY: Math.min(...y),
        }
    }
};

module.exports = new Constract;