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

import axios from "axios"

// import upperCase from "../../../Helpers/upperCase";

const BusSellScreen = ({ coinName, walletID, open, setOpen, walletStateToggle, setWalletStateToggle }) => {
  const [quantity, setQuantity] = useState(1);
  const [buySell, setBuySell] = useState(null)

  const handleQuantityChange = (event) => {
    event.preventDefault();

    setQuantity(event.target.value);
  };

  const handleRadio = (event) => {
    event.preventDefault();

    setBuySell(event.target.value)
  }

//   useEffect(() => {

//   }, [ buySell ])

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
     setOpen(false);
    }
    setQuantity(1)
    setBuySell(null)
  };

  const handleExecute = () => {
    setOpen(false);

    axios
    .put(`/api/wallet/updateWallet/${walletID}`, { quantity: quantity })
    .then((res) => {
      console.log(res.data);
      setWalletStateToggle(!walletStateToggle);
      console.log(`New ${coinName} total is ${res.data.quantity}`);
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(buySell)
  }

  const buyStatement = buySell === "buy" ? (<h3>Select Amount to Buy</h3>) : (<h3>Select Amount to Sell</h3>)
  const buySellStatement = () => {
    if (buySell === null) {
        return (<h3>Select option to execute Buy/Sell order</h3>)
    }
    else return buyStatement
}

  let quantityArray = [];
  for (let index = 1; index < 100; index++) {
    quantityArray.push(index);
  }
  return (
    <div className="coin-popup">
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Enter Quantity To Buy/Sell</DialogTitle>
        <DialogContent>
        <h3>{coinName}</h3>
        {buySellStatement()}
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap", minWidth: 400 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Option</FormLabel>
              <RadioGroup
                aria-label="Option"
                defaultValue=""
                name="radio-buttons-group"
                onChange={handleRadio}
              >
                <FormControlLabel 
                  value="buy"
                  control={<Radio />} 
                  label="Buy" 
                />
                <FormControlLabel
                  value="sell"
                  control={<Radio />}
                  label="Sell"
                />
              </RadioGroup>
            </FormControl>
            <FormControl disabled={buySell === null} sx={{ m: 1, minWidth: 220 }}>
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
                {quantityArray.map((buy) => (
                  <MenuItem key={buy} value={buy}>
                    {buy}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        <h3>{walletID}</h3>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleExecute}>
            Execute
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BusSellScreen;
