var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FightersSchema = new Schema({
    name: {
        type: String,
    },

    id: {
        type: String
    },

    stats: {
        type: Object
    },
});

var Fighters = mongoose.model("Fighters", FightersSchema)
module.exports = Fighters;