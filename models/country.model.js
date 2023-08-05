const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    country:{
        type: String ,
        unique: true,
        required:true,
    },
    code:{
        type:Number,
        unique: true,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model('Country', countrySchema);