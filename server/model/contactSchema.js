const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    fullName : { 
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    companyName : {
        type : String,
        required : true
    },
    companyLocation : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    budget : {
        type : Number,
        required : true
    },
    aboutProject : {
        type : String,
        required : true
    }
})


const Contact = mongoose.model('CONTACT', contactSchema);
module.exports =  Contact;