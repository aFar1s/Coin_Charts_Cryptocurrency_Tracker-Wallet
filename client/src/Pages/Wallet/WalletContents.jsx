import React, { useEffect, useState } from 'react'
import axios from 'axios'

const WalletContents = () => {
    const [walletData, setWalletData] = useState([])

    const userID = sessionStorage.getItem('userID')

    useEffect(() => {
        axios.get(`http://localhost:4001/api/wallet/${userID}`)
         .then((res) => setWalletData(res.data))
         .catch((err) => console.error(err))
    }, [userID])


    return (
        <div>
            <div className="walletData">
                {walletData.map((data) => {
                    return (
                        <div>
                            <h4>Coin: {data.coinName}</h4>
                            <h4>Value: {data.quantity}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WalletContents
