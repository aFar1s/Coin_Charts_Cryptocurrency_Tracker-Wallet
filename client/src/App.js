import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing/Landing"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import LoginScreen from "./Components/screens/LoginScreen";
import Dashboard from "./Pages/Dashboard/Dashboard"
import RegisterScreen from "./Components/screens/RegisterScreen"
import NavbarLogin from "./Components/NavbarLogin"
import Wallet from "./Pages/Wallet/Wallet"


function App() {
  return (
    <Router>
  <div className="App">
    <NavbarLogin />
    <Switch>
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/wallet" component={Wallet} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/register" component={RegisterScreen} />
    </Switch>
  </div>
  </Router>
  );
}

export default App;
