var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CombinsSchema = new Schema({
    name: {
        type: String
    },

    cards: [{
        fighters: [{
            name: {
                type: String
            },

            fighterUrl: {
                type: String
            },

            fighterId: {
                type: String
            },

            dk: {
                type: Object
            },

            predict: {
                type: Object
            },

            opponent: {
                type: String
            }
        }],
        config: {
            type: Object
        },
    }],

    createdAt: {
        type: String
    }
});

var Combins = mongoose.model("Combins", CombinsSchema)
module.exports = Combins;