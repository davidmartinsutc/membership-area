var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Product = require('./product');
var User = require('./user');

var schema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    licenceID: {type: String},
    licencePasswd: {type: String},
    licenceKey: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Licence', schema);