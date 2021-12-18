import React, { useState, useEffect } from "react";
import axios from "axios";
import upperCase from "../../Helpers/upperCase";
import numberAddComma from "../../Helpers/numberAddComma";
// import NewWalletContentData from "../../Helpers/NewWalletContentData"

//* MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BuyScreen = ({
  excludedArray,
  cashBalance,
  walletBalance,
  setWalletBalance,
  walletStateToggle,
  setWalletStateToggle,
}) => {
  const [open, setOpen] = useState(false);
  const [coinName, setCoinName] = useState(String);
  const [quantity, setQuantity] = useState(1);
  const [coinPrice, setCoinPrice] = useState(Number);

  const ownerID = sessionStorage.getItem("userID");

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      )
      .then((res) => {
        setCoinPrice(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
  }, [coinName]);

  const coinValue = (quant) => {
    return quant * coinPrice;
  };

  const coinValueXQuantity = coinValue(quantity);

  const handleCoinChange = (event) => {
    event.preventDefault();

    setCoinName(String(event.target.value));
  };

  const handleQuantityChange = (event) => {
    event.preventDefault();

    setQuantity(Number(event.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleBuy = () => {
    const newContent = {
      owner: ownerID,
      coinName: coinName,
      quantity: quantity,
    };

    const newBalance = walletBalance - coinValueXQuantity;
    console.log(newBalance);

    axios
      .post("/api/wallet/newWallet", newContent)
      .then((res) => {
        console.log(res.data);
        console.log("Added coin to wallet");
      })
      .catch((err) => {
        console.error(err);
    });

    axios
      .put(`/api/cashWallet/updateCash/${ownerID}`, { cashTotal: newBalance })
      .then((res) => {
        console.log(res.data);
        console.log("Updated cash balance");
      })
      .catch((error) => {
        console.log(error);
    });

    setWalletBalance(newBalance);
    setWalletStateToggle(!walletStateToggle);
    setOpen(false);
  };

  let buyQuantityArray = [];
  for (let index = 1; index < 100; index++) {
    buyQuantityArray.push(index);
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Buy</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select Coin & Quantity</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <InputLabel htmlFor="demo-dialog-native">Coin</InputLabel>
              <Select
                native
                onChange={handleCoinChange}
                input={<OutlinedInput label="Coin" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {excludedArray.map((coinname) => (
                  <option key={coinname} value={coinname}>
                    {upperCase(coinname)}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Quantity</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={quantity}
                onChange={handleQuantityChange}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {buyQuantityArray.map((buy) => (
                  <MenuItem key={buy} value={buy}>
                    {buy}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <h4>
            Unit Price: ${coinValue(1)}/{upperCase(coinName)}
          </h4>
          {coinValueXQuantity <= cashBalance ? (
            <div>
              <h4>
                ($ {numberAddComma(coinValueXQuantity)}) Will be deducted from
                your Balance of ($ {cashBalance}) for the purchase of {quantity}{" "}
                {upperCase(coinName)}
              </h4>
              <br />
              <h4>
                Cash balance after purchase will be ${" "}
                {(cashBalance - coinValueXQuantity).toFixed(2)}
              </h4>
            </div>
          ) : (
            <h4>
              Attempted purchase($ {numberAddComma(coinValueXQuantity)}) is more
              than available Cash Balance($ {cashBalance})
            </h4>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleBuy}
            disabled={!(coinValueXQuantity <= cashBalance)}
          >
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyScreen;
