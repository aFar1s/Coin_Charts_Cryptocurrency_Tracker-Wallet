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

//

module.exports = router;
