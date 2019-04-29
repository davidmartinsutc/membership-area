var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    bonus: [{
        titre: { type: String, required: true },
        image: { type: String },
        description: { type: String },
        downloadLink: { type: String }
    }]
});

module.exports = mongoose.model('BonusPage', schema);
