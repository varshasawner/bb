const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title : {
        type: String,
        required:true
    }
})

// Collection Creation
const Jobs  = mongoose.model('Jobs', jobSchema);
module.exports = Jobs;