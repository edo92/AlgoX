var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DatasetSchema = new Schema({
    datasetName: {
        type: String,
        unique: true
    },

    type: {
        type: String
    },
});

var Dataset = mongoose.model("Dataset", DatasetSchema)
module.exports = Dataset;