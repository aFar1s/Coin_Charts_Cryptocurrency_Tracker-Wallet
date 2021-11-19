const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const walletSchema = Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  cashTotal: { type: Number, require: true, default: 100000 },
  currencyUnit: { type: String, require: true, default: "USD" },
  coinQuantity: [{ coinName: String, quantity: Number }],
});

const Wallet = model("Wallet", walletSchema);

module.exports = Wallet;
