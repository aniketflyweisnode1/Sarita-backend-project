const mongoose = require('mongoose');
const disputeSchema = mongoose.Schema({
    message:{
        type:String,
        required:true,
        

    }
},{timestamps:true});

module.exports = mongoose.model('Dispute',disputeSchema);