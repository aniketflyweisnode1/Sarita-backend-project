const mongoose = require('mongoose');

const LegalSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        
    }
},{timestamps:true});

module.exports = mongoose.model('legalNotice',LegalSchema);