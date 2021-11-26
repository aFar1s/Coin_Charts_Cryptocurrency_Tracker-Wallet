import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logOutHandler from "../Helpers/logOutHandler"

export default function NavbarLogin() {
  // const userID = sessionStorage.getItem('userID');
  // const [login, setLogin] = useState(false)

  // function loginHandler() {
  //   if (userID) {
  //     setLogin(true)
  //   }
  
  //   else setLogin(false)
  // } 
  // logOutHandler()

  const [user, setUser] = useState({});

    useEffect(() => {
        setInterval(() => {
            const userString = sessionStorage.getItem('userID')
            const user = JSON.parse(userString);
            setUser(user);
            }, [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 5000);
  
  
    if (user) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: '#3a507a' }}>
            <Toolbar>
              <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                CryptoCurrency Tracker and Wallet
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} edge="start">
              </Typography>
              <Button color="inherit" component={Link} to='/dashboard'>Dashboard</Button>
              <Button color="inherit" component={Link} to='/wallet'>Wallet</Button>
              <Button color="inherit" onClick={logOutHandler} component={Link} to='/login'>Log Out</Button>
            </Toolbar>
          </AppBar>
        </Box>

  )}

  if (!user) {
    return (
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: '##3a507a' }}>
            <Toolbar>
              <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                CryptoCurrency Tracker and Wallet
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} edge="start">
              </Typography>
              <Button color="inherit" component={Link} to='/register'>SignUp</Button>
              <Button color="inherit" component={Link} to='/login'>Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
    )
  }
  
}