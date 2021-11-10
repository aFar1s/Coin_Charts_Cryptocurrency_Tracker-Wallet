const {Schema, model} = require('mongoose');

const dashboardSchema = Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Dashboard" },
  savedCoin: {type: String, require: false},
  savedCurrency: {type: String, require: false},
})

const Dashboard = model("Dashboard", dashboardSchema);

module.exports = Dashboard