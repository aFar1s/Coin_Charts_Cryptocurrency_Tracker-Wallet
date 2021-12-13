const express = require("express");
const router = express.Router();
const Wallet = require("../models/wallet");

// new Post

router.post("/newWallet", (req, res) => {
  const newWallet = new Wallet(req.body);

  newWallet.save()
  .then((wallet) => console.log(wallet))
  .catch((err) => res.status(400).json("Error " + err))
})

// new Put

router.put("/updateWallet/:id", (req, res) => {
  const updatedWallet = {
    owner: req.body.userID,
    coinName: req.body.coinName,
    quantity: req.body.quantity
  };

  Wallet.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: updatedWallet },
    (req, res, err) => {
      if (!err) {
        console.log(updatedWallet);
      } else {
        console.log(err);
      }
    }
  )
})

// Get
router.get("/:id", (req, res) => {
  Wallet
    .find({owner:req.params.id})
    .then((wallet) => res.json(wallet))
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

//* Delete
router.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;
  
  await Wallet.findByIdAndRemove(_id).exec();
})


module.exports = router;


// // Update Wallet
// router.put("/updateWallet/:id", (req, res) => {
//   const updateWallet = {
//     cashTotal: req.body.cashTotal,
//     coinQuantity: [
//       {
//          coinName: req.body.coinName,
//          amount: req.body.amount
//         }
//       ]
//   }

//   Wallet.findByIdAndUpdate(
//     { owner: req.params.id },
//     { $set: updateWallet },
//     (req, res, err) => {
//       if (!err) {
//         console.log("Wallet Updated!");
//       } else {
//         console.log(err);
//       }
//     }
//   )
//   .then((updatedWallet) => res.json(updatedWallet))
//   .then((updatedWallet) => console.log(updatedWallet))
//   .catch((err) => res.status(400).json("Error " + err));
// });

// router.get("/", (req, res) => {
//   const wallet = req.body;

//   Wallet.findById(
//     { _id: req.body.id },
//     (req, res, err) => {
//       if (!err) {
//         console.log("Wallet Found!");
//       } 
      
//       ((items) => res.json(items))
//       else {
  //         console.log(err);
  //       }
  //     }
  //   )
  // });
  // Update Wallet
//   router.put("/updateWallet/:id", (req, res) => {
//     const updateWallet = req.body.coinQuantity[0]

//     Wallet.findOneAndUpdate(
//       { owner: req.params.id },
//       { $set: updateWallet },
//       { new: true }
//     ).then((updatedWallet) => res.json(updatedWallet))
//      .catch((err) => res.status(400).json("Error " + err));
//  })
  // router.put("/updateWallet/:id", (req, res) => {
  //   const updateWallet = req.body

  //   Wallet.findOneAndUpdate(
  //     { owner: req.params.id },
  //     { $set: updateWallet },
  //     ( res, err ) => {
  //       if (!err) {
  //         ((updatedWallet) => {
  //           res.status(200).json(updatedWallet);
  //           console.log(updatedWallet);
  //         });
  //         console.log(updateWallet);
  //       } else {
  //         console.log(err);
  //       }
  //     }
  //   ).then((updatedWallet) => res.status(200).json(updatedWallet))
  //   .catch((err) => console.log(err)) 
  // });

  // => res.status(400).json("Error " + err));

  // router.put("/updateWallet/:objectID", (req, res) => {
  //   // const _id = req.params.ownerID;
  //   const objectID = req.params.objectID;
  //   const updateWallet = req.body
  //   console.log(_id)
  //   console.log(objectID)
  //   Wallet.findByIdAndUpdate(
  //     { objectID },
  //     { updateWallet },
  //     (req, res, err) => {
  //       if (!err) {
  //         ((updatedWallet) => res.status(200).json(updatedWallet));
  //       } else {
  //         console.log(err);
  //       }
  //     }
  //   )
  // });


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
// const updateWallet = {
//   cashTotal: req.body.cashTotal,
//   coinQuantity: [
//     {
//        coinName: req.body.coinName,
//        amount: req.body.amount
//       }
//     ]
// }


// {
//   "cashTotal": 90000,
//   "currencyUnit": "USD",
//   "coinQuantity": [
//       {
//           "coinName": "bitcoin",
//           "quantity": 90000
//       }
//   ]
// }