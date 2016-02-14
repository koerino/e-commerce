var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create schema
var userSchema = new Schema({
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
//export User model
var User = mongoose.model('User', userSchema);
module.exports = User;