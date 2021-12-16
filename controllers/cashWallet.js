const express = require("express");
const router = express.Router();
const CashWallet = require("../models/cashWallet");


//* Get
router.get("/:id", (req, res) => {
    CashWallet
      .find({owner:req.params.id})
      .then((wallet) => res.json(wallet))
      .catch((err) => res.status(400).json("Error: " + err))
  }
);

//* Update 
router.put("/updateCash/:id", (req, res) => {
   const owner = { owner: req.params.id }
   const updateCash = { $set: { cashTotal: req.body.cashTotal }};
   const options = { new: true }
   
   console.log(req.body.newBalance)
   
   CashWallet.findOneAndUpdate(owner, updateCash, options)
   .then(
    (newWallet) => {
    res.status(200).json(newWallet)
    console.log(newWallet)
    })
   .catch((err) => res.status(400).json("Error " + err))
  }
)

//* Delete
module.exports = router;
