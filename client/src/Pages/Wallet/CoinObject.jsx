import React from 'react'

const CoinObject = ({ coinName, quantity }) => {
    return (
        <div>
          <h3>Coin: {coinName}</h3>  
          <h3>Amount Owned: {quantity}</h3>  
        </div>
    )
}

export default CoinObject
