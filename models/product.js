var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Section = require('./section');
var Product = require('./product');
var Cours = require('./cours');

var Testimonial = require('./testimonial');

var schema = new Schema({
    name: {type: String, required: true, unique: true},
    picture: {type: String},
    description_preview: {type: String},
    description_detail: {type: String},
    benefits_detail: {type: String},
    position: {type: Number},
    sections: [{type: Schema.Types.ObjectId, ref: 'Section'}],
    whatFor: {type: String},
    price: {type: Number},
    value: {type: Number},
    activated: {type: Boolean},
    video: {type: String},
    temps: {type: String},
    maj: {type: Date},
    second_title: {type: String},
    linked_trainings: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    linked_products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    testimonials: [{type: Schema.Types.ObjectId, ref: 'Testimonial'}],
    fa_title: {type: String},
    link_to: {type: String},
    offered_trainings: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    formationProduit: {type: String},
    downloadableBonus:  {type: String},
    iframelink:  {type: String}
});


module.exports = mongoose.model('Product', schema);

