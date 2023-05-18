const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

// dotenv.config();
console.log(require('dotenv').config())
require("./db/conn.js");
const User = require("./model/userSchema");

app.use(express.json());

const PORT = process.env.PORT;

app.get("/applyJob", (req, res) => {
    res.send("connected");
})

// app.post("/applyJob", (req, res) => {
//   const { name: Name, email, phone, experience, location, resume } = req.body;
//   if (!userName || !email || !phone || !experience || !location || !resume) {
//     return res.status(422).json({ error: "Can not use empty field" });
//   } else {
//     // create document for user
//     const user = new User({
//       userName,
//       email,
//       phone,
//       experience,
//       location,
//       resume,
//     });

//     User.findOne({ email: email })
//       .then((userExist) => {
//         // checking user exists of not in DB
//         if (userExist) {
//           return res.status(422).json({ error: "Email Already Exists" });
//         }

//         // save user in the collection
//         user
//           .save()
//           .then(() => {
//             res.status(200).json({ message: "User Saved" });
//           })
//           .catch((err) =>
//             res.status(500).json({ Error: "Failed to Register" })
//           );
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// });

app.listen(PORT, () => {
  console.log(`${PORT} server is running.....`);
});
