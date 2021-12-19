import React, { useEffect, useState } from "react";
import axios from "axios";
import WalletContents from "./WalletContents";
import BuyScreen from "./BuyScreen";
// import numberAddComma from "../../Helpers/numberAddComma";
// import NewWalletContentData from "../../Helpers/NewWalletContentData"
import lodash_difference from "lodash.difference";
import "./wallet.css";

const Wallet = () => {
  const [cashBalance, setCashBalance] = useState(Number);
  const [coinList, setCoinList] = useState([]);
  const [walletContents, setWalletContents] = useState([]);
  const [walletStateToggle, setWalletStateToggle] = useState(true)

  const userID = sessionStorage.getItem("userID");
  const x = coinList.map((coin) => coin.id);
  const y = walletContents.map((wallet) => wallet.coinName)
  const excludedArray = lodash_difference(x, y)

  useEffect(() => {
    axios
     .get(`/api/cashWallet/${userID}`)
     .then((res) => {
      setCashBalance(res.data[0].cashTotal);
     })
     .catch((error) => console.log(error));

     axios
     .get(`/api/wallet/${userID}`)
     .then((res) => {
       setWalletContents(res.data);
     })
     .catch((error) => console.log(error));

     axios
     .get(
       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
     )
     .then((res) => {
       setCoinList(res.data);
     })
     .catch((error) => console.log(error));    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletStateToggle]);

  return (
    <div>
      <div>
        <div>
        <h2>Cash Balance: $ {cashBalance}</h2>
        </div>
        <BuyScreen
          key={1}
          excludedArray={excludedArray}
          cashBalance={cashBalance}
          setCashBalance={setCashBalance}
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
              cashBalance={cashBalance}
              setCashBalance={setCashBalance}
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
