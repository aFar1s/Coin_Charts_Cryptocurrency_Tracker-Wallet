import React, { useState } from "react";
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

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import axios from "axios";

import upperCase from "../../../Helpers/upperCase";

const BusSellScreen = ({
  open,
  setOpen,
  coinName,
  walletID,
  cashBalance,
  setCashBalance,
  walletQuantity,
  walletContents,
  walletStateToggle,
  coinValue_quantity,
  setWalletStateToggle,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [buySell, setBuySell] = useState(null);
  const [validationText, setValidationText] = useState("");

  const coinValueInWallet = coinValue_quantity(quantity);
  const ownerID = sessionStorage.getItem("userID");

  const validationTextChange = (event) => {
    setValidationText(event.target.value);
    console.log(validationText);
  };

  const handleQuantityChange = (event) => {
    event.preventDefault();

    setQuantity(event.target.value);
  };

  const handleRadio = (event) => {
    event.preventDefault();

    setBuySell(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
    setQuantity(1);
    setBuySell(null);
    setValidationText("")
  };

  const handleExecute = () => {
    setOpen(false);
    const updatedCashBalance =
      buySell === "buy"
        ? cashBalance - coinValueInWallet
        : cashBalance + coinValueInWallet;
    const updatedWalletQuantity =
      buySell === "buy" ? walletQuantity + quantity : walletQuantity - quantity;

    if (buySell === "sell" && updatedWalletQuantity === 0) {
      axios.delete(`api/wallet/delete/${walletID}`).catch((err) => {
        console.error(err);
      });

      axios
        .put(`/api/cashWallet/updateCash/${ownerID}`, {
          cashTotal: updatedCashBalance,
        })
        .then((res) => {
          console.log(res.data);
          setWalletStateToggle(!walletStateToggle);
          console.log(`New cash balance is ${res.data.cashTotal}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    axios
      .put(`/api/wallet/updateWallet/${walletID}`, {
        quantity: updatedWalletQuantity,
      })
      .then((res) => {
        console.log(res.data);
        setWalletStateToggle(!walletStateToggle);
        setBuySell(null);
        console.log(`New ${coinName} total is ${res.data.quantity}`);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .put(`/api/cashWallet/updateCash/${ownerID}`, {
        cashTotal: updatedCashBalance,
      })
      .then((res) => {
        console.log(res.data);
        setWalletStateToggle(!walletStateToggle);
        console.log(`New cash balance is ${res.data.cashTotal}`);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(buySell);
  };

  const valueInfo =
    buySell === "buy" && coinValueInWallet > cashBalance ? (
      <h3>Input a lower quantity or click cancel to choose another Coin</h3>
    ) : buySell === "buy" ? (
      <h4>${coinValueInWallet} will be deducted from you Cash Balance.</h4>
    ) : (
      <h4>${coinValueInWallet} will be added to your Cash Balance.</h4>
    );
  const valueStatement = () => {
    if (buySell === null) {
      return;
    } else return valueInfo;
  };

  const buyInfo =
    buySell === "buy" && coinValueInWallet > cashBalance ? (
      <h3>
        Attempted purchase ${coinValueInWallet} of {upperCase(coinName)} exceeds
        available Cash Balance of ${cashBalance}
      </h3>
    ) : buySell === "buy" ? (
      <h3>
        You are purchasing {quantity} {coinName}.
      </h3>
    ) : (
      <h3>
        You are selling {quantity} {coinName}
      </h3>
    );
  const buySatement = () => {
    if (buySell === null) {
      return;
    } else return buyInfo;
  };

  const buySellInfo =
    buySell === "buy" ? (
      <h3>Select Amount to Buy</h3>
    ) : (
      <h3>Select Amount to Sell</h3>
    );
  const buySellStatement = () => {
    if (buySell === null) {
      return <h3>Select option to execute Buy/Sell order</h3>;
    } else return buySellInfo;
  };

  let sellArray = [];
  for (let index = 1; index <= walletQuantity; index++) {
    sellArray.push(index);
  }
  let buyArray = [];
  for (let index = 1; index < 100; index++) {
    buyArray.push(index);
  }

  const buySellArray =
    buySell === "buy"
      ? buyArray.map((buy) => (
          <MenuItem key={buy} value={buy}>
            {buy}
          </MenuItem>
        ))
      : sellArray.map((sell) => (
          <MenuItem key={sell} value={sell}>
            {sell}
          </MenuItem>
        ));

  const disableExecute =
    buySell === "buy" ? coinValueInWallet > cashBalance : false;

  return (
    <div className="coin-popup">
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Enter Quantity To Buy/Sell</DialogTitle>
        <DialogContent>
          <h3>{upperCase(coinName)}</h3>
          {buySellStatement()}
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", minWidth: 400 }}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">Option</FormLabel>
              <RadioGroup
                aria-label="Option"
                defaultValue=""
                name="radio-buttons-group"
                onChange={handleRadio}
              >
                <FormControlLabel value="buy" control={<Radio />} label="Buy" />
                <FormControlLabel
                  value="sell"
                  control={<Radio />}
                  label="Sell"
                />
              </RadioGroup>
            </FormControl>
            <FormControl
              disabled={buySell === null}
              sx={{ m: 1, minWidth: 220 }}
            >
              <InputLabel id="demo-dialog-select-label">Quantity</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={quantity}
                onChange={handleQuantityChange}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {buySellArray}
              </Select>
            </FormControl>
          </Box>
          {buySatement()}
          {valueStatement()}
        </DialogContent>
        <DialogActions>
          {buySell !== null ? (
            <div>
              <h5 style={{ marginLeft: "15px", marginRight: "20px" }}>
                Type <bold>"{buySell} {coinName}"</bold> to validate transaction
              </h5>
              <input
                type="text"
                value={validationText}
                placeholder="Enter validation..."
                onChange={validationTextChange}
                style={{ marginRight: "20px", marginLeft: "15px", marginBottom: "10px" }}
              />
            </div>
          ) : (
            <div></div>
          )}
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            disabled={
              disableExecute ||
              buySell === null ||
              validationText !== `${buySell} ${coinName}`
            }
            onClick={handleExecute}
          >
            Execute
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BusSellScreen;
