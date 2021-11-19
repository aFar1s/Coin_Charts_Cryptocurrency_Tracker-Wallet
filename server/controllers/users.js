const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// router.post("/registerUser", async (req, res, next) => {
//   const { name, email, password, dateOfBirth } = req.body;

//   try {
//     // Create User
//     const user = await User.create({
//       name,
//       email,
//       password,
//       dateOfBirth,
//     });

//     // Create Dashboard
//     const dashboard = new Dashboard({ owner: user._id });
//     await dashboard.save();

//     // Create Wallet
//     const wallet = new Wallet({ owner: user._id });
//     await wallet.save();

//     sendToken(user, 200, res);
//     console.log([user, dashboard, wallet]);
//   } catch (err) {
//     next(err);
//   }
// });

// const sendToken = (user, statusCode, res) => {
//   const token = user.getSignedJwtToken();
//   res.status(statusCode).json({ sucess: true, token });
// };


// router.post("/userLogin", async (req, res, next) => {

//   const { email, password } = req.body;

//   // Check if email and password is provided
//   if (!email || !password) {
//     return next(new ErrorResponse("Please provide an email and password", 400));
//   }

//   try {
//     // Check that user exists by email
//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return next(new ErrorResponse("Invalid credentials", 401));
//     }

//     // Check that password match
//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return next(new ErrorResponse("Invalid credentials", 401));
//     }

//     sendToken(user, 200, res);
//   } catch (err) {
//     next(err);
//   }
// })

module.exports = router;

// router.post("/registerUser", async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();

//   res.json();
// });
