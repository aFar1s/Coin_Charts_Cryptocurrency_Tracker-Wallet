import React, { useState } from 'react'
import CoinSearch from './components/CoinSearch'
import Chart1 from "./components/Chart1/Chart1"
import Chart2 from "./components/Chart2/Chart2"
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import "./dashboard.css"
import upperCase from "../../Helpers/upperCase"

const Dashboard = () => {
    const [chartCoin, setChartCoin] = useState("bitcoin")

    return (
        <div>
         <Grid container>
             <Grid item sm={12} md={6}>
          <div className="dash-top-right">
              <Paper>   
              <h1>COIN DATA</h1>
              </Paper>
          </div>
          </Grid>
          <Grid item sm={12} md={6}>
          <div className="dash-top-left">
          <Paper>
              <h1>Chart 1</h1>
              <h2>{upperCase(chartCoin)} Prices</h2>
              <Chart1 chartCoin={chartCoin} />
              </Paper>
          </div>
          </Grid>
          <Grid item sm={12} md={6}>
          <div className="dash-bot-right">
          <Paper>
              <h1>Chart 2</h1>
              <h2>{upperCase(chartCoin)} Trading Volume</h2>
              <Chart2 chartCoin={chartCoin} />
              </Paper>
          </div>
          </Grid>
          <Grid item sm={12} md={6}>
          <div className="dash-bot-left">
          <Paper>
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
