var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DraftSchema = new Schema({
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

var Draft = mongoose.model("Draft", DraftSchema)
module.exports = Draft;