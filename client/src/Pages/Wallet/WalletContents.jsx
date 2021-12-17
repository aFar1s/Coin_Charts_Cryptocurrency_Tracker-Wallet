import React, { useEffect, useState } from "react";
import axios from "axios";
import upperCase from "../../Helpers/upperCase";
import BuySellPopUp from "./BuySellPopUp";
// import numberAddComma from "../../Helpers/numberAddComma";

const WalletContents = ({ coinName, quantity, id, setWalletContents, walletContents, walletBalance, setWalletBalance }) => {
  const [coinPrice, setCoinPrice] = useState(Number);
  const [buySellPopUpTrigger, setBuySellPopUpTrigger] = useState(false);

  const ownerID = sessionStorage.getItem("userID")
  console.log(id);
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
  
    
    
  const sellCoin = async (id) => {

    await setWalletContents(walletContents.filter((content) => content._id !== id))

    await setWalletBalance(walletBalance + coinValue)
 
    await axios.delete(`api/wallet/delete/${id}`)
    .then(axios.put(`/api/cashWallet/updateCash/${ownerID}`, { cashTotal: walletBalance } ))
    .then(alert(`Coins Sold`))
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
          <button onClick={() => setBuySellPopUpTrigger(true)}>
            Buy/Sell {upperCase(coinName)}
          </button>
          <button onClick={() => sellCoin(id)}>Sell ALL</button>
        </div>
      </div>

      <BuySellPopUp trigger={buySellPopUpTrigger}>
        <h3>test popup</h3>
      </BuySellPopUp>
    </div>
  );
};

export default WalletContents;
