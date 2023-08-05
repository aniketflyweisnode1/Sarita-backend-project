const mongoose = require('mongoose');

const endUserSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model("endUserAgreement",endUserSchema);