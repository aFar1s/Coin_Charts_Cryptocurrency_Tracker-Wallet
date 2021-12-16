import React, { useEffect, useState, useContext} from "react";
import axios from "axios";
import WalletContents from "./WalletContents";
import BuyScreen from "./BuyScreen";
import numberAddComma from "../../Helpers/numberAddComma";
// import NewWalletContentData from "../../Helpers/NewWalletContentData"
import lodash_difference from "lodash.difference";
import "./wallet.css";

const Wallet = () => {
  const [cashData, setCashData] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [walletContents, setWalletContents] = useState([]);
  const [number, setNumber] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  // const {newWalletContentData, setNewWalletContentData} = useContext(NewWalletContentData)

  const userID = sessionStorage.getItem("userID");
  const cashBalance = (cashData.map((cash) => cash.cashTotal))[0];

  useEffect(() => {
    setWalletBalance(cashBalance);
  }, [cashBalance])

  useEffect(() => {
    axios
      .get(`/api/cashWallet/${userID}`)
      .then((res) => {
        setCashData(res.data);
      })
      .catch((error) => console.log(error));
  }, [ userID ]);

  useEffect(() => {
    axios
      .get(`/api/wallet/${userID}`)
      .then((res) => {
        setWalletContents(res.data);
      })
      .catch((error) => console.log(error));
  }, [ userID ]);

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

  const x = coinList.map((coin) => coin.id);
  const y = walletContents.map((wallet) => wallet.coinName)
  const excludedArray = lodash_difference(x, y)

  const increment = () => {
    setNumber(number+1)
  }

  return (
    <div>
      <div>
        <div>
         <h2>Current Cash Balance: $ {(cashBalance)}</h2>
         <h2>Current Cash Balance: $ {number}</h2>
         <button onClick={increment}>UP</button>
        </div>
        <BuyScreen
          excludedArray={excludedArray}
          cashBalance={cashBalance}
          walletContents={walletContents}
          setWalletContents={setWalletContents}
          setWalletBalance={setWalletBalance}
          walletBalance={walletBalance}
        />
      </div>
      <h3>Wallet Contents:</h3>
      <div>
        {walletContents.map((wallet) => {
          return (
            <WalletContents
              key={wallet._id}
              id={wallet._id}
              coinName={wallet.coinName}
              quantity={wallet.quantity}
              increment={increment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wallet;
