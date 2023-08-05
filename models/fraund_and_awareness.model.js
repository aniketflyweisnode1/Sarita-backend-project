const mongoose = require('mongoose');

const fraudSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        
    }
},{timestamps:true});

module.exports = mongoose.model('FraudAndAwareness', fraudSchema);