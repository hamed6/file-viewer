const mongoose = require ('mongoose');
// import mongoose from 'mongoose';

var jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

// Model user Information
let userProfileSchema= new Schema({
    imo:{type:String},
    username:{type:String}, // login username 
    password:{type:String, required: true},
    series:{type:String},// fleet name only 
    email:{type:String, default:null},
    vesselname:{type:String}, // vessel name full MSCMINA
    customer:{type:String}, // customer name only MSC
    // shipInformation:{type:String},// Delete it
    // status:{type:Boolean, default:true}, // Delete it
});




// export default mongoose.model('userProfile',userProfile);
module.exports = mongoose.model('userprofile',userProfileSchema);
// module.exports = mongoose.model('userDocument',userDocument);

// let userProfile=mongoose.model('userProfile',userProfileSchema);
// let userDocument=mongoose.model('userDocument',userDocumentSchema);

// module.exports={
//     userDocument:userDocument,
//     userProfile:userProfile  
// };