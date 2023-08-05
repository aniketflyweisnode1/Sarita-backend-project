const mongoose = require('mongoose');

const legalSchema = new mongoose.Schema({
    accessibility:{
        type:String,
        
    },
    end_user_License_Agreement:{
        type:String,
    },
    privacy_statement:
    {
        type:String,
    
    },
    disputeResolution:{
        type:String,
    },
    LegalNotice:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('Legal', legalSchema);