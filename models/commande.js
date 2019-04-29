var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');
var User = require('./user');

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    date: {type: Date},
    traite: {type: Boolean}
});

module.exports = mongoose.model('Commande', schema);
