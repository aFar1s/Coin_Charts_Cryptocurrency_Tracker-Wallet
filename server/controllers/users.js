const express = require("express");
const router = express.Router();
const UserModel = require("../models/users");

router.get("/", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.post("/registerUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json();
});

module.exports = router;
