import React, { useEffect, useState } from 'react'
import axios from 'axios'
import WalletDisplay from "./WalletDisplay"

const Wallet = () => {
const [walletData, setWalletData] = useState([])
const userID = sessionStorage.getItem('userID');


useEffect(() => {
    axios
      .get(
        `/api/wallet/${userID}`
      )
      .then(res => {
        setWalletData(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, [userID]
);
 
console.log(walletData)

/*walletData.map(wallet => {
    return (
        <h3>{wallet.cashTotal}</h3>
    )



}) */

    return (
        <div>
            {walletData.map(wallet => {
    return (
        <WalletDisplay
        key={wallet._id}
        cashTotal={wallet.cashTotal}
        coinQuantity={wallet.coinQuantity}
        />
    )



})}
            {/* <h4>{walletData[0].cashTotal}</h4>
            <h4>Wallet ID:{walletData[0]._id}</h4>
            <h4>User_ID:{walletData[0].owner}</h4>
            <h4>User_ID:{walletData[0].owner}</h4>
            <h4>User_ID:{walletData[0].coinQuantity}</h4> */}
        </div>
    )
}

export default Wallet




// 619729dbcd05836c70437624
