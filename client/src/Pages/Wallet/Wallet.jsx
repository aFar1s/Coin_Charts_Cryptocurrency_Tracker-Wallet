import React, { useEffect, useState } from 'react'
import axios from 'axios'
import WalletContents from "./WalletContents"
import BuyScreen from "./BuyScreen"
import numberAddComma from '../../Helpers/numberAddComma'
import "./wallet.css"


const Wallet = () => {
 const [cashData, setCashData] = useState([])
 const [walletData, setWalletData] = useState([])
 const userID = sessionStorage.getItem('userID');
 
 useEffect(() => {
    axios
       .get
       (`/api/cashWallet/${userID}`)
       .then
       (res => {setCashData(res.data)
       })
       .catch(error => console.log(error))
   }, [userID]
   );
  
 
 useEffect(() => {
   axios
      .get
      (`/api/wallet/${userID}`)
      .then
      (res => {setWalletData(res.data)
      })
      .catch(error => console.log(error))
  }, [userID]
  );

  // const buyHandler = (event) => {
  //   event.preventDefault();

  //   alert(`You have bought Bitcoin!`)
  // }

 
  return (
    <div>
        <div>
          {cashData.map(cash => {
            return (
              <div key={cash._id}>
               <h2>Current Cash Holdings: $ {numberAddComma(cash.cashTotal)}</h2>
              </div>
            )
          })}
          <h3>Wallet Contents:</h3>
        </div>
        <BuyScreen />
        <div>
            {walletData.map(wallet => {
    return (
        <WalletContents
        key={wallet._id}
        coinName={wallet.coinName}
        quantity={wallet.quantity}
        />
    )
})}
        </div>
    </div>
    )
}

export default Wallet




