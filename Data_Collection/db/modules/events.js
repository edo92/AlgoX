var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventsSchema = new Schema({
    event: {
        type: Object
    }
});

var Events = mongoose.model("Events", EventsSchema)
module.exports = Events;