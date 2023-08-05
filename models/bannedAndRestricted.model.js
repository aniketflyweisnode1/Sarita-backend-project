const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    bannedItems:{
        type:[String]
    },
    restrictedItems:{
        type:[String]
    }
},{timestamps:true});

module.exports = mongoose.model('BannedAndRestrictedItems', itemsSchema);
