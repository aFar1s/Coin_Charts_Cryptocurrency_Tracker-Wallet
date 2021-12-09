import React, { useEffect, useState} from 'react'
import axios from 'axios'
import upperCase from "../../Helpers/upperCase"
import BuySellPopUp from './BuySellPopUp'
import numberAddComma from '../../Helpers/numberAddComma'

const WalletContents = ({ coinName, quantity }) => {
    const [coinPrice, setCoinPrice] = useState(Number)
    const [buySellPopUpTrigger, setBuySellPopUpTrigger] = useState(false)

    useEffect(() => {
        axios
        .get
        (`https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        .then
        (res => {setCoinPrice(res.data.market_data.current_price.usd)
        })
        .catch(error => console.log(error))
    }
    );
    
    const walletCoinValue = (quantity) => {
        return (quantity * coinPrice) 
    }

    const coinValue = numberAddComma(walletCoinValue(quantity).toFixed(2))

    return (
        <div className="wallet-container">
            <div className="walletData">
              <h4 className="wallet-text">Coin: {upperCase(coinName)}</h4>
              <h4 className="wallet-text">Amount of {upperCase(coinName)}: {quantity} {upperCase(coinName)}</h4>
              <h4 className="wallet-text">Value: $ {coinValue}</h4>
              <div className="wallet-btn">
                  <button onClick={()=> setBuySellPopUpTrigger(true)}>Buy/Sell</button>
                  <button>Sell ALL</button>
              </div>
            </div>

            <BuySellPopUp
             trigger={buySellPopUpTrigger} 
            >
                <h3>test popup</h3>
            </BuySellPopUp>
        </div>
)
}

export default WalletContents