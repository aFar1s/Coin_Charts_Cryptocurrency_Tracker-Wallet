const express = require("express");
const router = express.Router();
const WalletModel = require("../models/wallet");

// Get
router.get("/", (req, res) => {
  WalletModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Create Wallet
router.post("/registerWallet", async (req, res) => {
  const wallet = req.body;
  const newWallet = new WalletModel(wallet);
  await newWallet.save();

  res.json();
});

// Update Wallet

//

module.exports = router;
