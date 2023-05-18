const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect("mongodb+srv://varsha:IhKtX6SjAiHWaiFg@cluster0.f6eowtb.mongodb.net/", {
        useNewUrlParser: true,
       useUnifiedTopology: true
}).then(() => {
    console.log("connected");
}).catch((err) => {console.log(err + " error in connection")});