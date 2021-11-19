const express = require("express");
const router = express.Router();
const Dashboard = require("../models/dashboard");

// get
router.get("/", (req, res) => {
  Dashboard.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Create Dashboard
//! UNUSED ROUTE. FOR TESTING ONLY
router.post("/registerDashboard", async (req, res) => {
  const dashboard = req.body;
  const newDashboard = new Dashboard(dashboard);
  await newDashboard.save();

  res.json();
});

// Update Dashboard
router.put("/updateDashboard", (req, res) => {
    const updateDashboard = req.body;
  
    Dashboard.findByIdAndUpdate(
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
  });
  
module.exports = router;



