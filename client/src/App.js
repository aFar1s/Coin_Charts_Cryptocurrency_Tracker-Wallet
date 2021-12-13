import { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"

//* Components
import Landing from "./Pages/Landing/Landing"
import LoginScreen from "./Components/screens/LoginScreen";
import Dashboard from "./Pages/Dashboard/Dashboard"
import RegisterScreen from "./Components/screens/RegisterScreen"
import Navbar from "./Components/NavbarLogin"
import Wallet from "./Pages/Wallet/Wallet"
import ForgotPassword from "./Components/screens/ForgotPassword"
import ResetPassword from "./Components/screens/ResetPassword";

//* Style Sheet
import "./App.css";

//* Helpers
import ContextCoinID from "./Helpers/ContextCoinID"
import isAuth from "./Helpers/isAuth"
import NewWalletContentData from "./Helpers/NewWalletContentData"


function App() {
  const [globalCoin, setGlobalCoin] = useState("bitcoin")
  const [globalAuth, setGlobalAuth] = useState(false)
  const [newWalletContentData, setNewWalletContentData] = useState([])

  console.log(newWalletContentData)

  return (
    <Router>
  <div className="App">
    <Navbar />
    <Switch>
      <isAuth.Provider value={{globalAuth, setGlobalAuth}}>
      <ContextCoinID.Provider value={{ globalCoin, setGlobalCoin }}>
      <NewWalletContentData.Provider value={{ newWalletContentData, setNewWalletContentData }}>
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/wallet" component={Wallet} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/passwordreset/:resetToken" component={ResetPassword}/>
        <Route exact path="/register" component={RegisterScreen} />
      </NewWalletContentData.Provider>
      </ContextCoinID.Provider>
      </isAuth.Provider>
    </Switch>
  </div>
  </Router>
  );
}

export default App;
