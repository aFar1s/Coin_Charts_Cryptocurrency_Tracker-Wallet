import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Wallet = () => {
const [walletData, setWalletData] = useState([])
const userID = sessionStorage.getItem('userID');

// const wallet_data = {
//   _id: '619729dbcd05836c70437628',
//   owner: '619729dbcd05836c70437624',
//   cashTotal: 100000,
//   currencyUnit:"USD",
//   coinQuantity: [{}],
//  }

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

    return (
        <div>
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
