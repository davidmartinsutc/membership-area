var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    date: {type: Date, required: true},
    content: {type: String, required: true},
    link: {type: String},
    favicon: {type: String, required: true}
});

module.exports = mongoose.model('Notification', schema);
