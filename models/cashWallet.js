const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const cashWalletSchema = Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  cashTotal: { type: Number, require: true, default: 20000 },
});

const CashWallet = model("Cashwallet", cashWalletSchema);

module.exports = CashWallet;
