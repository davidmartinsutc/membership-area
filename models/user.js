var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Message = require('./message');
var Product = require('./product');
var Notification = require('./notification');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    birthDate: {type: Date},
    lastConnection: {type: Date},
    lastClickOnNews: {type: Date},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    userTrainings: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    userProducts: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    userNotifications: [{type: Schema.Types.ObjectId, ref: 'Notification'}],
    proxy: {type: String},
    reset_password_token: {type: String},
    reset_password_expires: {type: Date},
    panier: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);