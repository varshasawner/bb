const express = require("express");
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");
const path = require('path');

const app = express(); 
app.use(fileupload());
const assetFolder = path.join(__dirname, "assets")

dotenv.config();

const port = process.env.PORT;
require("./db/conn.js");
const User = require("./model/userSchema");
const Contact = require("./model/contactSchema");
const ContactHome = require("./model/contactHomeSchema");

app.use(express.urlencoded({ extended: false }))
     
// parse application/json
app.use(express.json())


// Job Description API-----------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
app.post("/applyJob", (req, res) => {
 
  const {resume} = req.files;
  const resumeName = resume.name;
  // console.log(resumeName)
 
  resume.mv(path.join(assetFolder, resume.name))

  const { firstName, lastName, email, phone, experience, location } = req.body;
  if (!firstName || !email || !phone || !experience || !location || !resumeName) {
    return res.status(422).json({ message: "Can not use empty field" });
  } else {
    // create document for user
    // console.log(req.body);
    const user = new User({
      lastName,
      firstName,
      email,
      phone,
      experience,
      location, 
      resume:resumeName
    });

    User.findOne({ email: email })
      .then((userExist) => {
        // checking user exists of not in DB
        if (userExist) {
          return res.status(422).json({ message: "Email Already Exists" });
        }
        // save user in the collection
        user.save().then(() => {
            res.status(200).json({ message: "User Saved" });
          })
          .catch((err) =>
            res.status(500).json({ message: "Failed to Register" })
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }
});


// contact form API ------------------------------------------------------------------
// -----------------------------------------------------------------------------------
app.post('/contact', (req, res)=>{
  // console.log(req.body);

  const {fullName, email, companyName, companyLocation, phone, budget, aboutProject} = req.body;
  if (!fullName || !email || !companyName || !companyLocation || !phone || !budget || !aboutProject){
    return res.status(422).json({"message" : "Can Not Save Empty Fields"})
  }else{
    const contact = new Contact({
      fullName,
      email,
      phone,
      companyName,
      companyLocation, 
      budget,
      aboutProject
    });
    Contact.findOne({ email: email })
    .then((contactExist) => {
      // checking user exists of not in DB
      if (contactExist) {
        return res.status(422).json({ message: "Email Already Exists" });
      }
      // save user in the collection
      contact.save().then(() => {
          res.status(200).json({ message: "Contact Saved" });
        })
        .catch((err) =>
          res.status(500).json({ message: "Failed to Register" })
        );
    })
    .catch((err) => {
      console.log(err);
    });
  }
})


// contactHome form API ------------------------------------------------------------------
// -----------------------------------------------------------------------------------
app.post('/contactHome', (req, res)=>{
  console.log(req.body);

  const {fullName, email, message} = req.body;
  if (!fullName || !email || !message){
    return res.status(422).json({"message" : "Can Not Save Empty Fields"})
  }else{
    const contactHome = new ContactHome({
      fullName,
      email,
      message
    });
    ContactHome.findOne({ email: email })
    .then((contactExist) => {
      // checking user exists of not in DB
      if (contactExist) {
        return res.status(422).json({ message: "Email Already Exists" });
      }
      // save user in the collection
      contactHome.save().then(() => {
          res.status(200).json({ message: "Contact Saved" });
        })
        .catch((err) =>
          res.status(500).json({ message: "Failed to Register" })
        );
    })
    .catch((err) => {
      console.log(err);
    });
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
