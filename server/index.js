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

app.use(express.urlencoded({ extended: false }))
     
// parse application/json
app.use(express.json())

app.post("/applyJob", (req, res) => {
  console.log(req.files);
  console.log(req.body);

  const {resume} = req.files;
 
  resume.mv(path.join(assetFolder, resume.name))

  const { firstName, lastName, email, phone, experience, location } = req.body;
  if (!firstName || !email || !phone || !experience || !location || !resume) {
    return res.status(422).json({ error: "Can not use empty field" });
  } else {
    // create document for user
    console.log(req.body);
    const user = new User({
      lastName,
      firstName,
      email,
      phone,
      experience,
      location,
      resume
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
            res.status(500).json({ Error: "Failed to Register" })
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
