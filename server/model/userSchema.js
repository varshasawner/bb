const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required:true
    },
    lastName : {
        type: String,
        required:true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type : Number,
        required:true
    },
    experience : {
        type : String,
        required:true
    },
    location : {
        type: String,
        required: true
    },
    resume : {
        type: String,
        required : true
    }
})

// Collection Creation
const User  = mongoose.model('USER', userSchema);
module.exports = User;