// DEPENDANCIES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const UserModel = require("./models/users");
const DashboardModel = require("./models/dashboard");
const WalletModel = require("./models/wallet");

// CONFIGURATION
require("dotenv").config();
const app = express();
const port = process.env.PORT ?? 4000;
mongoose.connect(process.env.MONGODB_URI ?? "mongodb://localhost/playground", {
  useNewUrlParser: true,
});
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

// User Routes
// const sessionController = require("./controllers/session_controller");
// app.use("/api/session", sessionController);
// const userController = require("./controllers/user");
// app.use("/api/user", userController);

app.get("/users", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/registerUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json();
});

// Dashboard Routes
// const dashboardController = require("./controllers/dashboard");
// app.use("/api/dashboard", dashboardController);

// get
app.get("/dashboard", (req, res) => {
  DashboardModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Create Dashboard
app.post("/registerDashboard", async (req, res) => {
  const dashboard = req.body;
  const newDashboard = new DashboardModel(dashboard);
  await newDashboard.save();

  res.json();
});

// Update Dashboard

//

// Wallet Routes
// const walletController = require("./controllers/wallet");
// app.use("/api/wallet", walletController);

// Get
app.get("/wallet", (req, res) => {
  WalletModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Create Wallet
app.post("/registerWalet", async (req, res) => {
  const wallet = req.body;
  const newWallet = new WalletModel(wallet);
  await newWallet.save();

  res.json();
});

// Update Wallet

//

// Listener
app.listen(port, () => {
  console.log(`Express server is live at ${port}...`);
});
