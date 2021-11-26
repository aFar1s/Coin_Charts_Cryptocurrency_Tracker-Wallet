import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CoinDisplay() {

    const [coinData, setCoinData] = useState([])

    useEffect(() => {
        axios
          .get(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
          )
          .then(res => {
            setCoinData(res.data);
            console.log(res.data);
          })
          .catch(error => console.log(error));
      }, []
    );

    
    
    return (
        <div>
            {coinData.map(coin => {
                return (
                    <div>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                    </div>
                )
            })}
            
        </div>
    )
}

export default CoinDisplay
