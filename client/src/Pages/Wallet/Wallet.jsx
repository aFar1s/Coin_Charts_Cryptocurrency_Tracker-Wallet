import React from 'react'

const Wallet = () => {
const wallet_data = {
  _id: '619729dbcd05836c70437628',
  owner: '619729dbcd05836c70437624',
  cashTotal: 100000,
  currencyUnit:"USD",
  coinQuantity: [{}],
 }

 const userID = sessionStorage.getItem('userID');
    return (
        <div>
            <h3>{userID}</h3>
            <h4>{wallet_data.cashTotal}</h4>
        </div>
    )
}

export default Wallet




// 619729dbcd05836c70437624
