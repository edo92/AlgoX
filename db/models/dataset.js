var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DatasetSchema = new Schema({
    datasetName: {
        type: String,
        unique: true
    },

    size: {
        type: Number
    },

    dataPoints: {
        type: Number
    },

    in: {
        type: String
    },

    used: {
        type: Number,
        default: 0
    }
});

var Dataset = mongoose.model("Dataset", DatasetSchema)
module.exports = Dataset;