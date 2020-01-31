const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});


var Ngo = new Schema({
    emailId: {
        type: String,
        default: ''
    },
    phoneNo: {
        type: String,
        default: ''
    },
    pocName: {
        type: String,
        default: ''
    },
    geometry: GeoSchema
});
Ngo.plugin(passportLocalMongoose);
module.exports = mongoose.model('Ngo', Ngo);