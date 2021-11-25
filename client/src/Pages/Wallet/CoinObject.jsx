import React, { useState, useEffect } from 'react'
import axios from "axios"

const CoinObject = () => {

  // function capFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  const [initCashData, setInitCashData] = useState(Number)
  // const [finalCashData, setFinalCashData] = useState(Number)
  // const [coinPrice, setCoinPrice] = useState(Number)
  const [coinName, setCoinName] = useState("")
  const [coinAmount, setCoinAmount] = useState(Number)
  // const [purchaseData, setPurchaseData] = useState(Number)
  // const [updatedCash, setUpdatedCash] = useState(Number)
  
  const userID = sessionStorage.getItem('userID');
  


// useEffect(() => {
//     axios
//       .get(
//         `/api/cashWallet/${userID}`   //! cashWallet only has cash amount. deafult 100 000
//       )
//       .then(res => {
//         setInitCashData(res.data.cashTotal)
//         console.log(res.data.cashTotal) //! 100 000
//       })
//       .catch(error => console.log(error))
//   }, [userID]
//   );

  // useEffect(() => {
  //   axios
  //     .get(
  //       `/api/coinWallet/${userID}`  //! coinWallet model does not exist yet. it will contain owner: userID
  //     )
  //     .then(res => {
  //       setCoinName(res.data.coinName)
  //       setCoinAmount(res.data.coinAmount)
  //       console.log(res.data) 
  //     })
  //     .catch(error => console.log(error))
  // }, [userID]
  // );

  //?pull price of x ref (coinPrice)
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`   
  //     )
  //     .then(res => {
  //       setCoinPrice(res.data.bitcoin.usd)
  //       console.log(res.data.bitcoin.usd) //! current price of bitcoin
  //     })
  //     .catch(error => console.log(error))
  // }, []
  // );
// const updateCashHandler = async(event) => {
//     event.preventDefault();

//       const updatedCashTotal = { cashTotal: finalCashData };
//     await axios
//     .put(`/api/cashWallet/${userID}`, updatedCashTotal)
//         .then(res => setInitCashData(res.data.initCashData));
// } 

 
      
      
      //!coinWallet model contains {coinName: x(coinName), coinAmount: y(coinAmount)}
       
      //!multiply y(coinAmount) and (coinPrice).
      // let totalCoinValue = coinAmount * coinPrice; 
      //?setPurchaseData((multiply y and (coinPrice)))
      // setPurchaseData(totalCoinValue) 
      //!setFinalCashData(initCashData - purchaseData)
      // setFinalCashData(initCashData - purchaseData)
    
      
    return (
      <div>
      <h3>Cash in Wallet: {initCashData}</h3>
      <h3>{coinName} in Wallet: {coinAmount}</h3>
      {/* <form onSubmit={updateCashHandler}>
      <input
            type="text"
            required
            id="cashUpdate"
            placeholder="Cash"
            onChange={(event) => setFinalCashData(event.target.value)}
            value={finalCashData}
          />
      </form> */}
    </div>

    )
}
export default CoinObject


  
      
    // return (
    // )

    /*
const [initCashData, setInitCashData] = useState(Number)
const [finalCashData, setFinalCashData] = useState(Number)
const [coinPrice, setCoinPrice] = useState(Number)
const [coinName, setCoinName] = useState('bitcoin')
const [coinAmount, setCoinAmount] = useState(Number)
const [purchaseData, setPurchaseData] = useState(Number)

const userID = sessionStorage.getItem('userID');



useEffect(() => {
    axios
      .get(
        `/api/cashWallet/${userID}`   //! cashWallet only has cash amount. deafult 100 000
      )
      .then(res => {
        setInitCashData(res.data.cashTotal)
        console.log(res.data.cashTotal) //! 100 000
      })
      .catch(error => console.log(error))
  }, [userID]
  );

  useEffect(() => {
    axios
      .get(
        `/api/coinWallet/${userID}`  //! coinWallet model does not exist yet. it will contain owner: userID
      )
      .then(res => {
        setCoinName(res.data.coinName)
        setCoinAmount(res.data.coinAmount)
        console.log(res.data.cashTotal) 
      })
      .catch(error => console.log(error))
  }, [userID]
  );

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`   
      )
      .then(res => {
        setCoinPrice(res.data.bitcoin.usd)
        console.log(res.data.bitcoin.usd) //! current price of bitcoin
      })
      .catch(error => console.log(error))
  }, []
  );

  function updateItem(id) {
        axios.put("/put/" + id, updatedItem);
        alert("item updated");
        console.log(`item with id ${id} updated`);
      }
  !coinWallet model contains {coinName: x(coinPrice), coinAmount: y(coinAmount)}
  ?pull price of x ref (coinPrice) 
  !multiply y(coinAmount) and (coinPrice). 
  ?setPurchaseData((multiply y and (coinPrice))) 
  ?setFinalCashData(initCashData - purchaseData)

*/
