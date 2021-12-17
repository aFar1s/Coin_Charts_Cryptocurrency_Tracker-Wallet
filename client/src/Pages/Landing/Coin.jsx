import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import  ContextCoinID  from '../../Helpers/ContextCoinID';

const Coin = ({ coinId ,name, price, symbol, marketcap, volume, image, priceChange, getDashCoin }) => {

  // eslint-disable-next-line no-unused-vars
  const {globalCoin, setGlobalCoin} = useContext(ContextCoinID)
  
    return (
      <div className='coin-container'>
        <Link to="/dashboard" onClick={() => setGlobalCoin(coinId)}> 
      <div className='coin-row'>
        <div className='coin'>
          <img src={image} alt='crypto' />
          <h1>{name}</h1>
          <p className='coin-symbol'>{symbol}</p>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>${price}</p>
          <p className='coin-volume'>${volume.toLocaleString()}</p>
          <p className='coin-marketcap'>
            Mkt Cap: ${marketcap.toLocaleString()}
          </p>

          {priceChange < 0 ? (
            <p className='coin-percent red'>{priceChange}%</p>
          ) : (
            <p className='coin-percent green'>{priceChange}%</p>
          )}

        </div>
      </div>
       </Link>
    </div>
  );
};

export default Coin;