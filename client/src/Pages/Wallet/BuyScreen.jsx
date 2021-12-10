import React, { useState, useEffect } from "react";
import axios from "axios";
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
import upperCase from "../../Helpers/upperCase";

function BuyScreen() {
  const [open, setOpen] = useState(false);
  const [coin, setCoin] = useState(String);
  const [quantity, setQuantity] = useState(Number);
  const [coinList, setCoinList] = useState(Array);
  const [coinNameList, setCoinNameList] = useState(Array);

  const handleCoinChange = (event) => {
    event.preventDefault();

    setCoin(String(event.target.value));
  };

  const handleQuantityChange = (event) => {
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

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoinList(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const x = coinList.map((coin) => coin.id);

  console.log(x);

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
                value={x}
                onChange={handleCoinChange}
                input={<OutlinedInput label="Coin" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {x.map((coinname) => (
                  <option key={coinname} value={coinname}>
                    {upperCase(coinname)}
                  </option>
                ))}
                {/* <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option> */}
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
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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

//https://api.coingecko.com/api/v3/coins/list?include_platform=false
