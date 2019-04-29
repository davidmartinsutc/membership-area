var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Section = require('./section');

var schema = new Schema({
    name: {type: String, required: true, unique: true},
    picture: {type: String},
    description: {type: String},
    sections: [{type: Schema.Types.ObjectId, ref: 'Section'}],
    video: {type: String},
    second_title: {type: String},
    link_to_aff: {type: String},
    link_to_noaff: {type: String}
});


module.exports = mongoose.model('Coupdecoeur', schema);

