const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const walletSchema = Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  cashTotal: { type: Number, require: true },
  currencyUnit: { type: String, require: true },
  coinQuantity: [{ coinName: String, quantity: Number }],
});

const Wallet = model("Wallet", walletSchema);

module.exports = Wallet;
