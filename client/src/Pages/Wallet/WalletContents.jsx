import React, { useEffect, useState } from "react";
import axios from "axios";
import upperCase from "../../Helpers/upperCase";
import BusSellScreen from "./components/BusSellScreen";
import Button from "@mui/material/Button";
// import numberAddComma from "../../Helpers/numberAddComma";

const WalletContents = ({
  coinName,
  quantity,
  id,
  cashBalance,
  setCashBalance,
  walletStateToggle,
  setWalletStateToggle,
}) => {
  const [coinPrice, setCoinPrice] = useState(Number);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const ownerID = sessionStorage.getItem("userID");
  const walletCoinValue = (quant) => {
    return quant * coinPrice;
  };
  const coinValue = walletCoinValue(quantity);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      )
      .then((res) => {
        setCoinPrice(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
  });

  const sellCoin = (id) => {
    const updatedWalletValue = cashBalance + coinValue;

    axios.delete(`api/wallet/delete/${id}`).catch((err) => {
      console.error(err);
    });

    axios
      .put(`/api/cashWallet/updateCash/${ownerID}`, {
        cashTotal: updatedWalletValue,
      })
      .then((res) => {
        console.log(res.data);
        setCashBalance(res.data.cashTotal);
        setWalletStateToggle(!walletStateToggle);
        console.log(`Coins sold. New cash balance is ${res.data.cashTotal}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="wallet-container">
      <div className="walletData">
        <h4 className="wallet-text">Coin: {upperCase(coinName)}</h4>
        <h4 className="wallet-text">
          Amount of {upperCase(coinName)}: {quantity} {upperCase(coinName)}
        </h4>
        <h4 className="wallet-text">Value: $ {coinValue}</h4>
        <div className="wallet-btn">
          <BusSellScreen coinName={coinName} 
            open={open} 
            setOpen={setOpen} 
            walletID={id}
            walletStateToggle={walletStateToggle}
            setWalletStateToggle={setWalletStateToggle}
            walletCoinValue={walletCoinValue}
          />
          <Button className="wallet-button" variant="outlined" onClick={() => sellCoin(id)}>Sell ALL</Button>
          <Button className="wallet-button" variant="outlined" onClick={handleClickOpen}>Buy/Sell {coinName}</Button>
        </div>
      </div>
    </div>
  );
};

export default WalletContents;
