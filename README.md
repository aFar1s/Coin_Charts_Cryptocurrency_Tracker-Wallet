# Coin_Charts_Cryptocurrency_Tracker-Wallet
Project 4

Features

1.  Log In Authentication

- Required fields are name, email, password 
- Json web token
- Email verification ( 1st bonus )

1.  Forget Password

- Email verification to reset password ( 1st bonus ) 
- SendGrid
- nodemailer

3.  Landing Page

- This page will be accessible to all users. Do not require a token
- Page will list all the coins available from the CoinGecko Api
- Will display basic information about the coin 
- Have a search bar to search for coin name

4.  Dashboard

- Will require log in to access
- Will display data for user consumption. User will be able to select which data from which coin they want displayed. For those data sets with historical data, user will be able to select the time period they want to see
- Pull data from CoinGecko API and map out the data
- Apexcahrts to display the data
- Search coin name functionality ( search bar )


5.  Wallet

- Model will contain wallet owner, cash total, currency unit, coin amount ( eg. coin A: 5 coins, Coin B: 10 Coins ), coin value ( ie. coin amount in wallet x current coin price eg. Coin A : USD 5 000 ) 
- Will have buy and sell coins functionality
- For demo purposes user will have USD 100 000 as default cash total upon account creation to serve as money

6.  Profit Tracker 

- Track user profit/loss 
- Data to be plotted on graph

Technology Stacks/Libraries/Frameworks/Dependencies 

- MongoDB
- Express,
- React
- NodeJs
- Axios
- Apexcharts
- Mui 
- React-grid-layout
- nodemailer
- sendGrid

API

https://www.coingecko.com/en/api/documentation?


