const vision = require('@google-cloud/vision');
const path = require('path');
const fs = require('fs');

class Actions {
    constructor() {
        this.start = () => {
            this.getDir('images', event => {
                this.getDir(`images/${event}`, image => {
                    readImage(event, image);
                });
            });
        }
        this.test = async () => {
            let imageText = this.readImage();
            let constract = require('./constract');
            return await constract.constractFight(imageText);
            // mapImageText(imageText);
        }
    }

    readImage = async (event, image) => {
        let fileTest = `images/Lee vs. Oliveira/Screen Shot 2020-03-29 at 5.08.28 PM.png`;
        let fileName = `${event}/${image}`;

        const client = new vision.ImageAnnotatorClient();

        const [result] = await client.textDetection(fileTest);
        return result.textAnnotations;

        // return detections.map((text, i) => {
        //     return text.description;
        // });
    };

    getDir(dir, callback) {
        const directoryPath = path.join(__dirname, dir);
        fs.readdir(directoryPath, (err, files) => {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                callback(file);
            });
        });
    };
};

module.exports = new Actions;



