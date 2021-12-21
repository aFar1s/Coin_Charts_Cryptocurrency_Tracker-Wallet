const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const walletSchema = Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  coinName: { type: String, default: "bitcoin" },
  quantity: { type: Number, default: 1, min: 0 }
});

const Wallet = model("Wallet", walletSchema);

module.exports = Wallet;
