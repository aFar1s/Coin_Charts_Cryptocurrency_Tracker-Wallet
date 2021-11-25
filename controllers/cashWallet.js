const express = require("express");
const router = express.Router();
const CashWallet = require("../models/cashWallet");


// Get
router.get("/:id", (req, res) => {
    CashWallet
      .find({owner:req.params.id})
      .then((wallet) => res.json(wallet))
      .catch((err) => res.status(400).json("Error: " + err))
  });

  module.exports = router;
