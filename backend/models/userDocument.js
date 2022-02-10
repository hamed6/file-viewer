const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

// Model document 
let userDocumentSchema= new Schema({
    imo:{type:String},
    fileloc1:{type:String},
    fileloc2:{type:String},
    fileloc3:{type:String},
    fileloc4:{type:String},
    fileloc5:{type:String},
    fileloc6:{type:String},
    fileloc7:{type:String},
    fileloc8:{type:String},
    fileloc9:{type:String},
    fileloc10:{type:String},
    fileloc11:{type:String},
    docversion:{type:Number},
});


module.exports = mongoose.model('userdocuments',userDocumentSchema);