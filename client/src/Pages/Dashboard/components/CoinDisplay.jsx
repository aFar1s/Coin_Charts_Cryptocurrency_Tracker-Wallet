import React, { useState, useEffect } from "react";
import axios from "axios";
import upperCase from "../../../Helpers/upperCase";

function CoinDisplay({ coinID }) {
  const [image, setImage] = useState("");
  const [genesis, setGenesis] = useState("");
  const [liquidity, setLiquidity] = useState("");
  const [algo, setAlgo] = useState("");
  const [ath, setAth] = useState("");
  const [atl, setAtl] = useState("");
  const [price, setPrice] = useState("");
  const [marCap, setMarCap] = useState("");
  const [per30d, setPer30d] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [circulation, setCirculation] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      )
      .then((res) => {
        setImage(res.data.image.small);
        setGenesis(res.data.genesis_date);
        setLiquidity(res.data.liquidity_score);
        setAlgo(res.data.hashing_algorithm);
        setAth(res.data.market_data.ath.usd);
        setAtl(res.data.market_data.atl.usd);
        setPrice(res.data.market_data.current_price.usd);
        setMarCap(res.data.market_data.market_cap.usd);
        setPer30d(res.data.market_data.price_change_percentage_30d);
        setTotalSupply(res.data.market_data.total_supply);
        setCirculation(res.data.market_data.circulating_supply);
      })
      .catch((error) => console.log(error));
  }, [coinID]);

  const underLineStyle = {
    "border-bottom": "1px solid #a4a3a3",
  };

  return (
    <div>
      <h2 style={{ underLineStyle }}>{upperCase(coinID)}</h2>
      <img src={image} alt="crypto" />
      <h4 style={{ underLineStyle }}>Date Created: {genesis}</h4>
      <h4>Liquidity Score: {liquidity}</h4>
      <h4>Hashing Method: {algo}</h4>
      <h4>All Time High: ${ath}</h4>
      <h4>All Time Low: ${atl}</h4>
      <h4>Current Price: ${price}</h4>
      <h4>Market Capitalisation: ${marCap}</h4>
      <h4>30-Day Price % Delta: {per30d}</h4>
      <h4>
        Total Available Supply: {totalSupply} {upperCase(coinID)}
      </h4>
      <h4>Average Circulation: {circulation} Coins</h4>
    </div>
  );
}

export default CoinDisplay;
