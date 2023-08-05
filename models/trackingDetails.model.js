const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    trackingId: {
        type: String,
        required: true,
    }
}, {timestamps:true});

module.exports = mongoose.model('Tracking', trackingSchema);
