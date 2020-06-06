const mongoose = require('mongoose')


const labelSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        required:true
    }
},
{timestamps:true});


module.exports = mongoose.model('Label',labelSchema);