require('dotenv').config();
const mongoose = require('mongoose');
const models = require('./modules');
const actions = require('./actions');

class Database {
    constructor() {
        this.db = { ...models };

        this.actions = { ...actions };

        this.connect = callback => {
            const MONGODB_URI = process.env.MONGODB_URI;
            mongoose.set('useCreateIndex', true);
            mongoose.set('useFindAndModify', false);

            const mdbConfig = {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true
            };

            mongoose.connect(MONGODB_URI, mdbConfig);
            mongoose.connection.once('open', () => {
                console.log('Mongodb connection successful')
                if (callback) callback();
            });
        }
    }
}

module.exports = new Database;