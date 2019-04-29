var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    titre: {type: String, required: true},
    lien: {type: String, required: true},
    description: {type: String, required: true},
    chapitres: [{
        titre: {type: String, required: true},
        numero: {type: Number},
        description: {type: String},
        sousChapitres: [{
            titre: {type: String, required: true},
            texte: {type: String},
            video: {type: String},
            numero: {type: Number},
            duree: {type: String}
        }]
    }]
});

module.exports = mongoose.model('Cours', schema);
