import React, { useEffect, useState } from "react";
import axios from "axios";
import upperCase from "../../Helpers/upperCase";
import BusSellPopUp from "./BuySellPopUp"
// import numberAddComma from "../../Helpers/numberAddComma";

const WalletContents = ({ coinName, quantity, id, walletBalance, setWalletBalance, walletStateToggle, setWalletStateToggle }) => {
  const [coinPrice, setCoinPrice] = useState(Number);

  const ownerID = sessionStorage.getItem("userID")
  const walletCoinValue = (quantity) => {
    return quantity * coinPrice;
  };
  const coinValue = (walletCoinValue(quantity));

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
    const updatedWalletValue = walletBalance + coinValue
    
    axios.delete(`api/wallet/delete/${id}`)
    .catch(err => {console.error(err);})
    
    axios.put(`/api/cashWallet/updateCash/${ownerID}`, { cashTotal: updatedWalletValue } )
    .then(res => {
      console.log(res.data);
      console.log("Coins sold")
    })
    .catch(err => {console.error(err);})
    
    setWalletStateToggle(!walletStateToggle)
    setWalletBalance(updatedWalletValue)
  }


  return (
    <div className="wallet-container">
      <div className="walletData">
        <h4 className="wallet-text">Coin: {upperCase(coinName)}</h4>
        <h4 className="wallet-text">
          Amount of {upperCase(coinName)}: {quantity} {upperCase(coinName)}
        </h4>
        <h4 className="wallet-text">Value: $ {coinValue}</h4>
        <div className="wallet-btn">
          <BusSellPopUp
            coinName={coinName}
          />
          <button onClick={() => sellCoin(id)}>Sell ALL</button>
        </div>
      </div>
    </div>
  );
};

export default WalletContents;
