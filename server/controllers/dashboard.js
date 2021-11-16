const express = require("express");
const router = express.Router();
const DashboardModel = require("../models/dashboard");

// get
router.get("/", (req, res) => {
  DashboardModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Create Dashboard
router.post("/registerDashboard", async (req, res) => {
  const dashboard = req.body;
  const newDashboard = new DashboardModel(dashboard);
  await newDashboard.save();

  res.json();
});

// Update Dashboard
router.put("/updateDashboard", (req, res) => {
    const updateDashboard = req.body;
  
    Wallet.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: updateDashboard },
      (req, res, err) => {
        if (!err) {
          console.log("Dashboard Updated!");
        } else {
          console.log(err);
        }
      }
    )
  //   .then((updatedWallet) => res.json(updatedWallet))
  //   .then((updatedWallet) => console.log(updatedWallet))
  //   .catch((err) => res.status(400).json("Error " + err));
  });
//

module.exports = router;
