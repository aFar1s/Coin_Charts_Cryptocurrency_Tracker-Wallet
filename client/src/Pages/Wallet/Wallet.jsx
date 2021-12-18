import React, { useEffect, useState } from "react";
import axios from "axios";
import WalletContents from "./WalletContents";
import BuyScreen from "./BuyScreen";
// import numberAddComma from "../../Helpers/numberAddComma";
// import NewWalletContentData from "../../Helpers/NewWalletContentData"
import lodash_difference from "lodash.difference";
import "./wallet.css";

const Wallet = () => {
  const [cashData, setCashData] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [walletContents, setWalletContents] = useState([]);
  const [walletBalance, setWalletBalance] = useState(Number);
  const [walletStateToggle, setWalletStateToggle] = useState(true)

  const userID = sessionStorage.getItem("userID");
  const cashBalance = (cashData.map((cash) => cash.cashTotal))[0];
  const x = coinList.map((coin) => coin.id);
  const y = walletContents.map((wallet) => wallet.coinName)
  const excludedArray = lodash_difference(x, y)

  useEffect(() => {
    setWalletBalance(cashBalance);
  }, [cashBalance])

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`/api/cashWallet/${userID}`)
        .then((res) => {
          setCashData(res.data);
        })
        .catch((error) => console.log(error));
    }, 500)
  }, [ userID ]);

  useEffect(() => {
    console.log(walletStateToggle)
    setTimeout(() => {
      axios
        .get(`/api/wallet/${userID}`)
        .then((res) => {
          setWalletContents(res.data);
        })
        .catch((error) => console.log(error));
    }, 500)
  }, [ userID, walletStateToggle ]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoinList(res.data);
      })
      .catch((error) => console.log(error));    
  }, []);

  return (
    <div>
      <div>
        <div>
          {walletStateToggle ? (<h2>Current Cash Balance: $ {(walletBalance)}</h2>) : (<h2>Cash Balance: $ {(walletBalance)}</h2>)}
        </div>
        <BuyScreen
          key={1}
          excludedArray={excludedArray}
          cashBalance={cashBalance}
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          walletStateToggle={walletStateToggle}
          setWalletStateToggle={setWalletStateToggle}

        />
      </div>
      <h3>Wallet Contents:</h3>
      <h3 className="hide">{String(walletStateToggle)}</h3>
      <div>
        {walletContents.map((wallet) => {
          return (
            <WalletContents
              key={wallet._id}
              id={wallet._id}
              coinName={wallet.coinName}
              quantity={wallet.quantity}
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
              walletStateToggle={walletStateToggle}
              setWalletStateToggle={setWalletStateToggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wallet;
