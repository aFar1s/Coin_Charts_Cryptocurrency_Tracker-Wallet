import React from 'react'
import CoinObject from "./CoinObject"

const WalletDisplay = ({ cashTotal, coinQuantity }) => {
    return (
        <div>
            <h3>Current Cash Holdings: {cashTotal}</h3>
            {coinQuantity.map(coin => {
                return (
                   <CoinObject
                   key={coin._id}
                   coinName={coin.coinName}
                   quantity={coin.quantity}
                   />
                )
            })}
        </div>
    )
}

export default WalletDisplay
