const express = require("express");
const dotenv = require("dotenv");
const app = express(); 

dotenv.config();

const port = process.env.PORT;
require("./db/conn.js");
const User = require("./model/userSchema");

app.use(express.urlencoded({ extended: false }))
     
// parse application/json
app.use(express.json())

app.post("/applyJob", (req, res) => {
    console.log(req.body);
  const { firstName, email, phone, experience, location, resume } = req.body;
  if (!firstName || !email || !phone || !experience || !location || !resume) {
    return res.status(422).json({ error: "Can not use empty field" });
  } else {
    // create document for user
    const user = new User({
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
