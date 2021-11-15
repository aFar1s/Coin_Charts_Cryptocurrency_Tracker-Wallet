// DEPENDANCIES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const UserModel = require("./models/users")

// CONFIGURATION
require("dotenv").config();
const app = express();
const port = process.env.PORT ?? 4000;
mongoose.connect(
  process.env.MONGODB_URI ??
    "mongodb://localhost/playground"
);
mongoose.connection.on("open", () => {
  console.log(
    `Connection to MongoDB ${process.env.MONGODB_URI ? "Atlas" : ""} is open`
  );
});

// Middleware
// const path = require("path");
// app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//! Routes

app.get("/users", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

app.post("/registerUser", async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save()

    res.json()
})

// User Routes
// const sessionController = require("./controllers/session_controller");
// app.use("/api/session", sessionController);
// const userController = require("./controllers/user");
// app.use("/api/user", userController);

// // Dashboard Routes
// const dashboardController = require("./controllers/dashboard");
// app.use("/api/dashboard", dashboardController);

// // Wallet Routes
// const walletController = require("./controllers/wallet");
// app.use("/api/wallet", walletController);

// Listener
app.listen(port, () => {
  console.log(`Express server is live at ${port}...`);
});
