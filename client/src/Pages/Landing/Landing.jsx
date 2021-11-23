import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from "./Coin";
import "./landing.css"

const Landing = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [chartCoin, setChartCoin] = useState("bitcoin");


    useEffect(() => {
        axios
          .get(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
          )
          .then(res => {
            setCoins(res.data);
            console.log(res.data);
          })
          .catch(error => console.log(error));
      }, []
    );

    const handleChange = event => {
        setSearch(event.target.value);
      };
    
      const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );

    
    
    return (
       <div className='coin-app'>
        <div className='coin-search'>
         <h1 className='coin-text'>Search a coin {chartCoin}</h1>
         <form>
           <input
             className='coin-input'
             type='text'
             onChange={handleChange}
             placeholder='Search'
           />
         </form>
        </div>
       {filteredCoins.map(coin => {
       return (
         <Coin
           key={coin.id}
           coinId={coin.id}
           name={coin.name}
           price={coin.current_price}
           symbol={coin.symbol}
           marketcap={coin.total_volume}
           volume={coin.market_cap}
           image={coin.image}
           priceChange={coin.price_change_percentage_24h}
           getDashCoin={setChartCoin}
         />
         );
       })}
       </div>
    )
}

export default Landing

