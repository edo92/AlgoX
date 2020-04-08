const path = require('path');
const fs = require('fs');

module.exports = (dir, callback) => {
    // Directory
    const directoryPath = path.join(__dirname, `../../${dir}`);

    // List files in the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) throw err;

        files.forEach((file, index) => {
            let diff = index > 8 ? 3 : 0;
            setTimeout(() => { callback(file) }, 6000 * index - diff);
        });
    });
}