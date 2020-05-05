var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CombinsSchema = new Schema({
    cards: [{
        type: Array
    }],

    createdAt: {
        type: String
    }
});

var Combins = mongoose.model("Combins", CombinsSchema)
module.exports = Combins;