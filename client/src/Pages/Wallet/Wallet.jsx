import React, { useEffect, useState } from 'react'
import axios from 'axios'
import WalletDisplay from "./WalletDisplay"

const Wallet = () => {
const [cashData, setCashData] = useState([])
const [walletData, setWalletData] = useState([])
const userID = sessionStorage.getItem('userID');

useEffect(() => {
   axios
      .get(
        `/api/cashWallet/${userID}`
      )
      .then(res => {
        setCashData(res.data)
      })
      .catch(error => console.log(error))
  }, [userID]
  );
 
console.log(cashData)

useEffect(() => {
  axios
     .get(
       `/api/wallet/${userID}`
     )
     .then(res => {
       setWalletData(res.data)
     })
     .catch(error => console.log(error))
 }, [userID]
 );

  return (
        <div>
          {cashData.map(cash => {
            return (
              <h2>Current Cash Holdings: {cash.cashTotal}</h2>
            )
          })}
            {walletData.map(wallet => {
    return (
        <WalletDisplay
        key={wallet._id}
        cashTotal={wallet.cashTotal}
        coinQuantity={wallet.coinQuantity}
        />
    )
})}
           
        </div>
    )
}

export default Wallet




