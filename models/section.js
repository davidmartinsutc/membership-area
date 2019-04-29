var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Product = require('./product');

var schema = new Schema({
    position: {type: Number, required: true},
    sectionName: {type: String, required: true},
    whatFor: {type: String, required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Section', schema);