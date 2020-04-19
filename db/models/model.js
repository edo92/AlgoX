var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelSchema = new Schema({
    modelName: {
        type: String,
        unique: true
    },

    type: {
        type: String
    },

    saveIn: {
        type: String
    },

    epochs: {
        type: Number
    },

    layer1: {

    },

    layer2: {

    },

    layer3: {

    },

    results: {
        type: Object
    }
});

var Model = mongoose.model("Model", ModelSchema)
module.exports = Model;