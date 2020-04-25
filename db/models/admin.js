var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    events: {
        type: Number
    },

    fights: {
        type: Number
    },

    fighters: {
        type: Number
    },

    eventErr: {
        type: Number
    },

    fightErr: {
        type: Number
    },

    fighterErr: {
        type: Number
    }
});

var Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin;