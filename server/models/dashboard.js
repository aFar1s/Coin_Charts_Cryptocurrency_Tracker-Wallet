const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const dashboardSchema = Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  savedCoin: { type: String, require: false },
  savedCurrency: { type: String, require: false },
});

const Dashboard = model("Dashboard", dashboardSchema);

module.exports = Dashboard;
