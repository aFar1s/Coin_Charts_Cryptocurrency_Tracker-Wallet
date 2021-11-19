// DEPENDANCIES
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const cors = require("cors");

// CONFIGURATION
const app = express();
const port = process.env.PORT ?? 4001;

// CONNECT TO MONGODB
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    //useUnifiedTopology: true,
    // useCreateIndex: true,
    //useFindAndModify: true,
    });
  };
connectDB();

mongoose.connection.on("open", () => {
  console.log(
    `Connection to MongoDB ${process.env.MONGODB_URI ? "Atlas" : ""} is open`
  );
});

// Middleware
app.use(express.json());
app.use(cors());

//! Routes

// Auth Routes
const authController = require("./controllers/auth")
app.use("/api/auth", authController);

// Protected Routes
// const protectedRoutes = require("./controllers/protectedRoutes")
// app.use("/api/private", protectedRoutes);

// User Routes
const userController = require("./controllers/users");
app.use("/api/users", userController);

// Dashboard Routes
const dashboardController = require("./controllers/dashboard");
app.use("/api/dashboard", dashboardController);

// Wallet Routes
const walletController = require("./controllers/wallet");
app.use("/api/wallet", walletController);

// Listener
app.listen(port, () => {
  console.log(`Express server is live at ${port}...`);
});



// mongoose.connect(process.env.MONGODB_URI ?? "mongodb://localhost/playground", {
//   useNewUrlParser: true,
// });
// Middleware
// const path = require("path");
// app.use(express.static(path.join(__dirname, "./client/build")));