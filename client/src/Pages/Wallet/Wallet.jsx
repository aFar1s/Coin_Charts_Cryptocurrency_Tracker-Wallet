import React, { useEffect, useState } from "react";
import axios from "axios";
import WalletContents from "./components/WalletContents";
import BuyScreen from "./components/BuyScreen";
import Profit from "./../ProfitTracker/Profit"
// import numberAddComma from "../../Helpers/numberAddComma";
// import NewWalletContentData from "../../Helpers/NewWalletContentData"
import lodash_difference from "lodash.difference";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TotalNetWorth } from "../../Helpers/useContext"
import "./wallet.css";

const Wallet = () => {
  const [cashBalance, setCashBalance] = useState(Number);
  const [coinList, setCoinList] = useState([]);
  const [walletContents, setWalletContents] = useState([]);
  const [walletStateToggle, setWalletStateToggle] = useState(true);
  // const [netValue, setNetValue] = useState(Number)
  const [test, setTest] = useState([Number])


  const userID = sessionStorage.getItem("userID");
  const x = coinList.map((coin) => coin.id);
  const y = walletContents.map((wallet) => wallet.coinName);
  const excludedArray = lodash_difference(x, y);

  useEffect(() => {
    axios
      .get(`/api/cashWallet/${userID}`)
      .then((res) => {
        setCashBalance(res.data[0].cashTotal);
        setTest([res.data[0].cashTotal])
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

  console.log(test)

  return (
    <div>
      <TotalNetWorth.Provider value={{test, setTest}}>
      <div>
        <div>
          <h2>Cash Balance: $ {cashBalance}</h2>
          {/* <h2>Cash Balance: $ {test[0]}</h2> */}
        </div>
        <BuyScreen
          key={1}
          excludedArray={excludedArray}
          cashBalance={cashBalance}
          setCashBalance={setCashBalance}
          walletStateToggle={walletStateToggle}
          setWalletStateToggle={setWalletStateToggle}
        />
        <Grid container>
          <Grid item sm={10} md={8}>
            <div className="wallet-right">
              <Paper style={{ minHeight: 1000 }}>
                <h3 style={{textDecoration: 'underline'}}>Wallet Contents:</h3>
                {walletContents.map((wallet) => {
                  return (
                    <WalletContents
                      key={wallet._id}
                      id={wallet._id}
                      coinName={wallet.coinName}
                      quantity={wallet.quantity}
                      cashBalance={cashBalance}
                      setCashBalance={setCashBalance}
                      walletContents={walletContents}
                      walletStateToggle={walletStateToggle}
                      setWalletStateToggle={setWalletStateToggle}
                    />
                  );
                })}
              </Paper>
            </div>
          </Grid>
          <Grid item sm={12} md={4}>
            <div className="wallet-left">
              <Paper style={{ minHeight: 1000 }}>
                <Profit />
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
      <h3 className="hide">{String(walletStateToggle)}</h3>
      </TotalNetWorth.Provider>
    </div>
  );
};

export default Wallet;
