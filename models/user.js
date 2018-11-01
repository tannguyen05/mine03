var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    firstname: String,
    lastname: String,
    email: String
})

module.exports = mongoose.model('myModel', user);

