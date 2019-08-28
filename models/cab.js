const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
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

// create ninja Schema & model
const CabSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    cartype: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const Cab = mongoose.model('cab', CabSchema);

module.exports = Cab;
