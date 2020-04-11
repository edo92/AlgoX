var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventsSchema = new Schema({
    name: {
        type: String,
        unique: true
    },

    date: {
        type: String,
    },

    location: {
        type: String
    },

    link: {
        type: String
    },

    fights: [{
        type: Object
    }]
});

var Events = mongoose.model("Events", EventsSchema)
module.exports = Events;