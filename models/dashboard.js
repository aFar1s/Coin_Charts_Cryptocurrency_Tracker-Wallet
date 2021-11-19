const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const dashboardSchema = Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  savedCoin: { type: String, require: false, default: "" },
  savedCurrency: { type: String, require: false, default: "USD" },
});

const Dashboard = model("Dashboard", dashboardSchema);

module.exports = Dashboard;
