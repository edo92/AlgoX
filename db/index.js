const mongoose = require('mongoose');
const models = require('./models.js');

class DB {
    constructor() {
        this.models = models;

        this.connect = () => {
            const MONGODB_URI = process.env.MONGODB_URI;

            mongoose.set('useCreateIndex', true);
            mongoose.set('useFindAndModify', true);

            const mdbConfig = {
                useNewUrlParser: true,
                useFindAndModify: true,
                useCreateIndex: true
            };
            mongoose.connect(MONGODB_URI, mdbConfig);

            mongoose.connection.once('open', () => {
                console.log('mongoose connection successful');
            });
        }
    }
};

module.exports = new DB;