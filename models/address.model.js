const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
    country:{
        type:String,
        required:true
    },
    pinCode:{
            type:Number,
            required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Address', addressSchema);
