import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import upperCase from "../../Helpers/upperCase";

//! MUI
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

const BuyScreen = ({ excludedArray }) => {
  const [open, setOpen] = useState(false);
  const [coin, setCoin] = useState(String);
  const [quantity, setQuantity] = useState(1);

  const handleCoinChange = (event) => {
    event.preventDefault();

    setCoin(String(event.target.value));
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

  let buyQuantityArray = []

  for (let index = 1; index < 100; index++) {
      buyQuantityArray.push(index)
  }

  console.log(buyQuantityArray)

  return (
    <div>
      <Button onClick={handleClickOpen}>Buy</Button>
      <h4>{coin}</h4>
      <h4>{quantity}</h4>
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
                    <MenuItem key={buy} value={buy}>{buy}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BuyScreen;

// <MenuItem value={10}>Ten</MenuItem>
