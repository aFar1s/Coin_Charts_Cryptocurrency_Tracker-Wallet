// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const UserModel = require("../models/users")





// app.get("/users", (req, res) => {
//     UserModel.find({}, (err, result) => {
//         if (err) {
//             res.json(err);
//         } else {
//             res.json(result);
//         }
//     })
// })

// app.post("/registerUser", async (req, res) => {
//     const user = req.body
//     const newUser = new UserModel(user)
//     await newUser.save()

//     res.json()
// })