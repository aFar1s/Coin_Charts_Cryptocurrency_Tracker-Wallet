// import React, { useState, useEffect } from 'react'
// import axios from "axios"

const CoinObject = () => {

  
 

 
      
      

    
      
    return (
      <div>
      
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
      !coinWallet model contains {coinName: x(coinName), coinAmount: y(coinAmount)}
       
      !multiply y(coinAmount) and (coinPrice).
      let totalCoinValue = coinAmount * coinPrice; 
      ?setPurchaseData((multiply y and (coinPrice)))
      setPurchaseData(totalCoinValue) 
      !setFinalCashData(initCashData - purchaseData)
      setFinalCashData(initCashData - purchaseData)

*/
