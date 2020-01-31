const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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


var Event = new Schema({
    date: {
        type: Date
    },
    time: {
        type: Date
    },
    locName: {
        type: String,
        default: ''
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: GeoSchema
});

module.exports = mongoose.model('Event', Event);