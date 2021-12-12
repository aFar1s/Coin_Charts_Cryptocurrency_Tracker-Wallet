import React, { useEffect, useState, useContext} from "react";
import axios from "axios";
import WalletContents from "./WalletContents";
import BuyScreen from "./BuyScreen";
import numberAddComma from "../../Helpers/numberAddComma";
import NewWalletContentData from "../../Helpers/NewWalletContentData"
import lo_difference from "lodash.difference";
import "./wallet.css";

const Wallet = () => {
  const [cashData, setCashData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  // const [exclude, setExclude] = useState([])
  const [coinList, setCoinList] = useState([]);
  const userID = sessionStorage.getItem("userID");

  const {newWalletContentData, setNewWalletContentData} = useContext(NewWalletContentData)


  useEffect(() => {
    axios
      .get(`/api/cashWallet/${userID}`)
      .then((res) => {
        setCashData(res.data);
      })
      .catch((error) => console.log(error));
  }, [userID]);

  useEffect(() => {
    axios
      .get(`/api/wallet/${userID}`)
      .then((res) => {
        setWalletData(res.data);
      })
      .catch((error) => console.log(error));
  }, [userID]);

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

  const y = walletData.map((wallet) => wallet.coinName)

  const excludedArray = lo_difference(x, y)

  const cashBalanceArray = cashData.map((cash) => cash.cashTotal);

  const cashBalance = cashBalanceArray[0]

  console.log(cashBalance)

  return (
    <div>
      <div>
        {cashData.map((cash) => {
          return (
            <div key={cash._id}>
              <h2>Current Cash Balance: $ {numberAddComma(cash.cashTotal)}</h2>
            </div>
          );
        })}
        <BuyScreen
          excludedArray={excludedArray}
          cashBalance={cashBalance}
          setWalletData={setWalletData}
          walletData={walletData}
        />
      </div>
      <h3>Wallet Contents:</h3>
      <div>
        {walletData.map((wallet) => {
          return (
            <WalletContents
              key={wallet._id}
              coinName={wallet.coinName}
              quantity={wallet.quantity}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wallet;
