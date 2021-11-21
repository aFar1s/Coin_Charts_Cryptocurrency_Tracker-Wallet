import React, { useState } from 'react'
// import axios from 'axios'
import CoinSearch from './components/CoinSearch'
import Chart1 from "./components/Chart1"
import Chart2 from "./components/Chart2"

const Dashboard = () => {
    const [chartCoin, setChartCoin] = useState("bitcoin")

    
   
   
    return (


        <div>
          <div className="dash-top-right">
              <h1>COIN DATA</h1>
          </div>
          <div className="dash-top-left">
              <h1>Chart 1</h1>
              <h2>{chartCoin} Prices</h2>
              <Chart1 chartCoin={chartCoin} />
          </div>
          <div className="dash-bot-right">
              <h1>Chart 2</h1>
              <h2>{chartCoin} Trading Volume</h2>
              <Chart2 chartCoin={chartCoin} />
          </div>
          <div className="dash-bot-left">
              <CoinSearch 
              setChartCoin={setChartCoin}
              />
          </div>   
        </div>
    )
}

export default Dashboard
