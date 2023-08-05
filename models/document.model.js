const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    length:{
        type:Number,
        // required:true
    },
    width:{
        type:Number,
        // required:true
    },
    height:{
        type:Number,
        // required:true
    },
    quantity:{
        type:Number,
        // required:true
    },
    weight:{
        type:Number,
        // required:true
    },
    shipmentValue:{
        type:Number,
        // required:true
    },
    currency:{
        type:String,
        // required:true
        
    }
    
},
{timestamps:true});

module.exports = mongoose.model('Weight', documentSchema);
