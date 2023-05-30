const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true
    }
})

// Collection Creation
const Courses  = mongoose.model('Course', courseSchema);
module.exports = Courses;