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

// import upperCase from "../../../Helpers/upperCase";

const BusSellScreen = ({ coinName, walletID, open, setOpen }) => {
  const [quantity, setQuantity] = useState(1);
  const [buySell, setBuySell] = useState("buy")

  const handleQuantityChange = (event) => {
    event.preventDefault();

    setQuantity(event.target.value);
  };

  const handleRadio = (event) => {
    event.preventDefault();

    setBuySell(event.target.value);
  }

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

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
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                defaultValue="buy"
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
            <FormControl sx={{ m: 1, minWidth: 220 }}>
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
          <Button variant="outlined" onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BusSellScreen;
