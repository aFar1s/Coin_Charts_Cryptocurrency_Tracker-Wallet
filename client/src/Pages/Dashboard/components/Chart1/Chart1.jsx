import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Chart1 = ({ chartCoin }) => {
    //! chartCoin1 is the coin name that is to be searched for on CoinGecko API.
    //! chartData1.prices is the array of historical data that is to be plotted onto the Chart1
    const [chartData1, setChartData1] = useState([])



    useEffect(() => {
        axios
        .get(
            `https://api.coingecko.com/api/v3/coins/${chartCoin}/ohlc?vs_currency=usd&days=180`
            )
            .then((res) => {
                setChartData1(res.data);
            });
        }, [ chartCoin ]);



console.log(chartData1);

    return (
        <div>
            <p>{chartData1}</p>
        </div>
    )
}

export default Chart1


// https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=180
