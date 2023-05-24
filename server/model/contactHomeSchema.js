const mongoose = require('mongoose');

const contactHomeSchema = new mongoose.Schema({
    fullName : {
        type :String,
        required :true
    }, 
    email : {
        type: String,
        required : true,
        unique : true
    },
    message : {
        type : String,
        required: true
    }
})

const ContactHome = mongoose.model('CONTACTHOME', contactHomeSchema);
module.exports =  ContactHome;