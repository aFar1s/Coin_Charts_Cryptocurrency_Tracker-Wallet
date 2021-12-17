import * as React from "react";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logOutHandler from "../Helpers/logOutHandler";

//* MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

const NavbarLogin = () => {
  // const [userAuth, setUserAuth] = useState(false);
  // const user = sessionStorage.getItem("userID");

  // useEffect(() => {
  //   if (user) {
  //     setUserAuth(true);
  //   } else setUserAuth(false);
  // }, [user]);

  return (
    <div>
      {sessionStorage.getItem("userID") ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: "#3a507a" }}>
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
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                edge="start"
              ></Typography>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/wallet">
                Wallet
              </Button>
              <Button
                color="inherit"
                onClick={logOutHandler}
                component={Link}
                to="/login"
              >
                Log Out
              </Button>
              <Button color="inherit" component={Link} to="/register">
                SignUp
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: "#3a507a" }}>
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
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                edge="start"
              ></Typography>
              <Button color="inherit" component={Link} to="/register">
                SignUp
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </div>
  );
};

export default NavbarLogin;
