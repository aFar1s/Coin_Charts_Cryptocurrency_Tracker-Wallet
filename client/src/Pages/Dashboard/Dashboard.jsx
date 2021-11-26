import React, { useState } from 'react'
import CoinSearch from './components/CoinSearch'
import Chart1 from "./components/Chart1/Chart1"
import Chart2 from "./components/Chart2/Chart2"
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import "./dashboard.css"
import upperCase from "../../Helpers/upperCase"
import CoinDisplay from './components/CoinDisplay'

const Dashboard = () => {
    const [chartCoin, setChartCoin] = useState("bitcoin")

    return (
        <div>
         <Grid container>
             <Grid item sm={12} md={6}>
          <div className="dash-top-right">
              <Paper style={{maxHeight: 475, overflow: 'auto'}}>   
              <h2>Coin Information</h2>
                <CoinDisplay coinID={chartCoin} />
              </Paper>
          </div>
          </Grid>
          <Grid item sm={12} md={6}>
          <div className="dash-top-left">
          <Paper>
              <h2>{upperCase(chartCoin)} Prices</h2>
              <Chart1 chartCoin={chartCoin} />
              </Paper>
          </div>
          </Grid>
          <Grid item sm={12} md={6}>
          <div className="dash-bot-right">
          <Paper>
              <h2>{upperCase(chartCoin)} Trading Volume</h2>
              <Chart2 chartCoin={chartCoin} />
              </Paper>
          </div>
          </Grid>
          <Grid item sm={12} md={6}>
          <div className="dash-bot-left">
          <Paper style={{maxHeight: 435, overflow: 'auto'}}>
              <CoinSearch 
              setChartCoin={setChartCoin}
              />
              </Paper>
          </div>
          </Grid>
         </Grid>   
        </div>
    )
}

export default Dashboard
