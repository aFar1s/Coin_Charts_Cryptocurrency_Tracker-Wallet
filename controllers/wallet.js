const express = require("express");
const router = express.Router();
const Wallet = require("../models/wallet");

//* Create
//* Used when buying coin. For wallet initialization, refer to controllers/auth at the register user route.
router.post("/newWallet", (req, res) => {
  const newWallet = new Wallet(req.body);

  newWallet.save()
  .then(wallet => res.json(wallet))
  .then(wallet => console.log(wallet + "wallet created"))
  .catch(err => res.status(400).json("Error " + err))
})

//* Update
router.put("/updateWallet/:id", (req, res) => {
   const walletID = req.params.id 
   const updatedWallet = { $set: { quantity: req.body.quantity }};
   const options = { new: true };
 
   Wallet.findByIdAndUpdate(walletID, updatedWallet, options)
   .then(
     (newWallet) => {
     res.status(200).json(newWallet)
     console.log(newWallet)
     })
    .catch((err) => res.status(400).json("Error " + err))
  }
)

//* Get
router.get("/:id", (req, res) => {
  Wallet
    .find({owner:req.params.id})
    .then((wallet) => res.json(wallet))
    .catch((err) => res.status(400).json("Error: " + err))
});

//* Delete
router.delete("/delete/:id", (req, res) => {
  const _id = req.params.id;
  
  Wallet.findByIdAndRemove(_id).exec()
  .then(console.log("Wallet Content deleted"))
})

module.exports = router;
