const mongoose = require('mongoose');
const mongodb_url = require('./constants');
//Add database url below
const URL = mongodb_url;

var studentSchema = new mongoose.Schema( {
    name:String,email:String,
    address:String },
    {versionKey : false} );

var StudentModel = mongoose.model("student",studentSchema);

mongoose.connect( URL, {useNewUrlParser: true,useUnifiedTopology: true} );

module.exports = StudentModel