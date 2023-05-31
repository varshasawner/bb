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
const User = require("./model/userSchema.js");
const Contact = require("./model/contactSchema.js");
const ContactHome = require("./model/contactHomeSchema.js");
const Courses = require("./model/coursesSchema.js");
const Job = require("./model/jobSchema.js");

app.use(express.urlencoded({ extended: false }))
     
// parse application/json
app.use(express.json())


// Job Description API-----------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
app.post("/applyJob", (req, res) => {
  // console.log(req.body);
  if(!req.files){
    return res.status(422).json({ error: "Can not use empty field" });
  }
  const {resume} = req.files;
  const resumeName = resume.name;
  // console.log(resumeName)
 
  const { firstName, lastName, email, phone, experience, location, captcha, captchaText } = req.body;
  if (!firstName || !email || !phone || !experience || !location || !resumeName || !captchaText) {
    return res.status(422).json({ error: "Can not use empty field" });
  } else if(captcha !== captchaText){
    return res.status(422).json({ error: "Wrong Captcha !" });
  }else {
    // create document for user
    // console.log(req.body);
    resume.mv(path.join(assetFolder, resume.name))
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
          return res.status(422).json({ error: "Email Already Exists" });
        }
        // save user in the collection
        user.save().then(() => {
            res.status(200).json({ message: "User Saved" });
          })
          .catch((err) =>
            res.status(422).json({ error: "Failed to Register" })
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

  const {fullName, email, companyName, companyLocation, phone, budget, aboutProject, captcha, captchaText} = req.body;
  if (!fullName || !email || !companyName || !companyLocation || !phone || !budget || !aboutProject || !captchaText){
    return res.status(422).json({error : "Can Not Save Empty Fields"})
  }else if(captcha !== captchaText){
    return res.status(422).json({ error: "Wrong Captcha !" });
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
        return res.status(422).json({ error: "Email Already Exists" });
      }
      // save user in the collection
      contact.save().then(() => {
          res.status(200).json({ message: "Contact Saved" });
        })
        .catch((err) =>
          res.status(500).json({ error: "Failed to Register" })
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

  const {fullName, email, message, captchaText, captcha} = req.body;
  if (!fullName || !email || !message || !captchaText){
    return res.status(422).json({error : "Can Not Save Empty Fields"})
  }else if(captcha !== captchaText){
    return res.status(422).json({ error: "Wrong Captcha !" });
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
        return res.status(422).json({ error: "Email Already Exists" });
      }
      // save user in the collection
      contactHome.save().then(() => {
          res.status(200).json({ message: "Contact Saved" });
        })
        .catch((err) =>
          res.status(500).json({ error: "Failed to Register" })
        );
    })
    .catch((err) => {
      console.log(err);
    });
  }
})


// Get Courses API-------------------------------------------------------
// -----------------------------------------------------------------------
app.get('/courses', async(req, res)=>{
  const courses = await Courses.find();
  if(courses.length < 1){
    res.status(500).send({error : "No Course Found"});
  }else{
    res.status(200).send(courses);
  }
})


// Job Data API----------------------------------------------------
app.get('/job', async(req, res)=>{
  const jobs = await Job.find();
  if(jobs.length < 1){
    res.status(500).send({error : "No Job Found"});
  }else{
    res.status(200).send(jobs);
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
