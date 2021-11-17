const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Dashboard = require("../models/dashboard");
const Wallet = require("../models/wallet");



router.get("/", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.post("/registerUser", async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    const dashboard = new Dashboard({owner: user._id})
    await dashboard.save();
    const wallet = new Wallet({owner: user._id})
    await wallet.save(); 


    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
});

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};

module.exports = router;

// router.post("/registerUser", async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();

//   res.json();
// });