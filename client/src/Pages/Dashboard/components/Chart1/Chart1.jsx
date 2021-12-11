import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexChart from "./ChartData";

const Chart1 = ({ chartCoin }) => {
  //! chartCoin1 is the coin name that is to be searched for on CoinGecko API.
  //! chartData1 is the array of historical data that is to be plotted onto the Chart1
  const [chartData1, setChartData1] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${chartCoin}/ohlc?vs_currency=usd&days=180`
      )
      .then((res) => {
        setChartData1(res.data);
      });
  }, [chartCoin]);

  return (
    <div>
      <ApexChart chartData1={chartData1} />
    </div>
  );
};

export default Chart1;
