import React, { useEffect, useState, useContext } from "react";
import { TotalNetWorth } from "../../../Helpers/useContext";
import axios from "axios";
import upperCase from "../../../Helpers/upperCase";
import BusSellScreen from "./BusSellScreen";
import Button from "@mui/material/Button";
// import numberAddComma from "../../Helpers/numberAddComma";

const WalletContents = ({
  id,
  coinName,
  quantity,
  cashBalance,
  walletContents,
  setCashBalance,
  walletStateToggle,
  setWalletStateToggle,
}) => {
  const [unitCoinValue, setUnitCoinValue] = useState(Number);
  const [open, setOpen] = useState(false);

  const {test, setTest} = useContext(TotalNetWorth)
  
  const coinValue_quantity = (quant) => {
    return quant * unitCoinValue;
  };
  const coinValueInWallet = coinValue_quantity(quantity);

  
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const ownerID = sessionStorage.getItem("userID");
  
  
  useEffect(() => {
    axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      )
      .then((res) => {
        setUnitCoinValue(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
    });
    
    const sellCoin = (id) => {
      const updatedCashBalance = cashBalance + coinValueInWallet;
      
      axios.delete(`api/wallet/delete/${id}`).catch((err) => {
        console.error(err);
      });
      
      axios
      .put(`/api/cashWallet/updateCash/${ownerID}`, {
        cashTotal: updatedCashBalance,
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
    
    useEffect(() => {
      setTest([...test, 1]);
    }, [ walletStateToggle ])

    return (
    <div className="wallet-container">
      <div className="walletData">
        <h4 className="wallet-text">Coin: {upperCase(coinName)}</h4>
        <h4 className="wallet-text">
          Amount of {upperCase(coinName)}: {quantity} {upperCase(coinName)}
        </h4>
        <h4 className="wallet-text">Value: $ {coinValueInWallet}</h4>
        <div className="wallet-btn">
          <BusSellScreen coinName={coinName} 
            open={open} 
            walletID={id}
            setOpen={setOpen} 
            cashBalance={cashBalance}
            walletQuantity={quantity}
            walletContents={walletContents} 
            setCashBalance={setCashBalance}
            walletStateToggle={walletStateToggle}
            coinValue_quantity={coinValue_quantity}
            setWalletStateToggle={setWalletStateToggle}
          />
          <Button className="wallet-button" variant="outlined" onClick={() => sellCoin(id)}>Sell ALL</Button>
          <Button className="wallet-button" variant="outlined" onClick={handleClickOpen}>Buy/Sell {coinName}</Button>
        </div>
      </div>
    </div>
  );
};

export default WalletContents;
