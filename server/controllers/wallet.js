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
router.put("/updateWallet", async (req, res) => {
  const toUpdateCashTotal = req.body.newCashTotal;
  const toUpdateCurrencyUnit = req.body.newCurrencyUnit;
  const toUpdateCoinQuantity = req.body.newCoinQuantity;
  const id = req.body.id;

  try {
    await WalletModel.findById(id, (error, walletToUpdate) => {
      walletToUpdate.cashTotal = toUpdateCashTotal; // may have to convert to Number with "Number(toUpdateCashTotal)"
      walletToUpdate.currencyUnit = toUpdateCurrencyUnit;
      walletToUpdate.coinQuantity = toUpdateCoinQuantity;
      walletToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }

  res.json();
});
//

module.exports = router;
