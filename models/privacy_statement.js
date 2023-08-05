const mongoose = require("mongoose"); 

const policySchema = mongoose.Schema({
    privacy: {
        type: String,
        required:true
    }
})



const policy  = mongoose.model('policy', policySchema);

module.exports = policy;