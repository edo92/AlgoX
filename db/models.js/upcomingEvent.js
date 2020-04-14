var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UpcomingEventSchema = new Schema({
    name: {
        type: String,
        unique: true
    },

    location: {
        type: String
    },

    fights: [{
        type: Object
    }],

    date: {
        type: String
    },
});

var UpcomingEvent = mongoose.model("UpcomingEvent", UpcomingEventSchema)
module.exports = UpcomingEvent;