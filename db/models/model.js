var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelSchema = new Schema({
    modelName: {
        type: String,
        unique: true
    },

    saveIn: {
        type: String
    },

    epochs: {
        type: Number
    },

    layer1: {
        type: Number
    },

    layer2: {
        type: Number
    },

    layer3: {
        type: Number
    },

    results: {
        type: Object
    }
});

var Model = mongoose.model("Model", ModelSchema)
module.exports = Model;