const express = require("express");
const router = express.Router();
const Wallet = require("../models/wallet");

// Get
router.get("/", (req, res) => {
  Wallet
    .find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err))
});

// Create Wallet
//! UNUSED ROUTE. FOR TESTING ONLY
router.post("/registerWallet", (req, res) => {
  const wallet = req.body;
  const newWallet = new Wallet(wallet);

  newWallet
    .save()
    .then((createdWallet) => console.log(createdWallet))
    .catch((err) => res.status(400).json("Error " + err));
});

// Update Wallet
router.put("/updateWallet", (req, res) => {
  const updateWallet = req.body;

  Wallet.findByIdAndUpdate(
    { _id: req.body.id },
    { $set: updateWallet },
    (req, res, err) => {
      if (!err) {
        console.log("Wallet Updated!");
      } else {
        console.log(err);
      }
    }
  )
//   .then((updatedWallet) => res.json(updatedWallet))
//   .then((updatedWallet) => console.log(updatedWallet))
//   .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;

// Init Create
// router.post("/registerWallet", async (req, res) => {
//     const wallet = req.body;
//     const newWallet = new WalletModel(wallet);
//     await newWallet.save();

//     res.json();
//   });

// init update
// router.put("/updateWallet", async (req, res) => {
//     const toUpdateCashTotal = req.body.newCashTotal;
//     const toUpdateCurrencyUnit = req.body.newCurrencyUnit;
//     const toUpdateCoinQuantity = req.body.newCoinQuantity;
//     const id = req.body.id;

//     try {
//       await WalletModel.findById(id, (error, walletToUpdate) => {
//         walletToUpdate.cashTotal = toUpdateCashTotal; // may have to convert to Number with "Number(toUpdateCashTotal)". Check with frontend.
//         walletToUpdate.currencyUnit = toUpdateCurrencyUnit;
//         walletToUpdate.coinQuantity = toUpdateCoinQuantity;
//         walletToUpdate.save();
//       });
//     } catch (err) {
//       console.log(err);
//     }

//     res.json();
//   });

// router.get("/", (req, res) => {
//     Wallet.find({}, (err, result) => {
//       if (err) {
//         res.json(err);
//       } else {
//         res.json(result);
//       }
//     });
//   });
