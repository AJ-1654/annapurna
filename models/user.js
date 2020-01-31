const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var authSchema = require('./auth');

var User = new Schema({
    emailId: {
        type: String,
        default: ''
    },
    phoneNo: {
        type: String,
        default: ''
    }
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);