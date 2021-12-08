import React, { useEffect, useState } from 'react'
import axios from 'axios'
import WalletContents from "./WalletContents"
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
  
 console.log(cashData)
 
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
 
  return (
        <div>
          {cashData.map(cash => {
            return (
              <div className={cash._id}>
              <h2>Current Cash Holdings: {cash.cashTotal}</h2>
              </div>
            )
          })}
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
    )
}

export default Wallet




