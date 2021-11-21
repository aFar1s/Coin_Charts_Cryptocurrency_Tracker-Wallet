import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Chart2 = ({chartCoin}) => {
    const [chartData2, setChartData2] = useState([])



    useEffect(() => {
        axios
        .get(
            `https://api.coingecko.com/api/v3/coins/${chartCoin}/market_chart/range?vs_currency=usd&from=1618342746&to=1634182746`
            )
            .then((res) => {
                setChartData2(res.data);
            });
        }, [ chartCoin ]);


console.log(chartData2.total_volumes);

    return (
        <div>
            <p>{chartData2.total_volumes}</p>
        </div>
    )
}

export default Chart2
