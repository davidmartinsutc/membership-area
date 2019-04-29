var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    auteur: {type: String, required: true, unique: true},
    comment: {type: String, required: true}
});


module.exports = mongoose.model('Testimonial', schema);

