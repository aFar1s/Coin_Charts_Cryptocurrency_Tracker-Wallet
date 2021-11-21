import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Chart1 = ({ chartCoin }) => {
    //! chartCoin1 is the coin name that is to be searched for on CoinGecko API.
    //! chartData1.prices is the array of historical data that is to be plotted onto the Chart1
    const [chartData1, setChartData1] = useState([])



    useEffect(() => {
        axios
        .get(
            `https://api.coingecko.com/api/v3/coins/${chartCoin}/market_chart/range?vs_currency=usd&from=1618342746&to=1634182746`
            )
            .then((res) => {
                setChartData1(res.data);
            });
        }, [ chartCoin ]);



console.log(chartData1.prices);

    return (
        <div>
            <p>{chartData1.prices}</p>
        </div>
    )
}

export default Chart1
