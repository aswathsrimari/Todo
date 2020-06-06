const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength: 32
    },
    label:{
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true,
        maxlength:2000
    },
    duedate:{
        type: String,
        required:true
    },
    duetime:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    }

},{timestamps:true});



module.exports = mongoose.model('Task',taskSchema);