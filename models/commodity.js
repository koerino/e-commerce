var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create schema
var commoditySchema = new Schema({
    _id: String,
    name: String,
    pictureUrl: String,
    price: Number,
    type: String,
    classification: String,
    description: String
});
//export Commodity model
var Commodity = mongoose.model('Commodity', commoditySchema);
module.exports = Commodity;