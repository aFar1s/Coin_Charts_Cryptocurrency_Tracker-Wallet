import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing/Landing"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import LoginScreen from "./Components/screens/LoginScreen";
import Dashboard from "./Pages/Dashboard/Dashboard"
import RegisterScreen from "./Components/screens/RegisterScreen"
import Navbar from "./Components/NavbarLogin"
import Wallet from "./Pages/Wallet/Wallet"
import ForgotPassword from "./Components/screens/ForgotPassword"
import ResetPassword from "./Components/screens/ResetPassword";


function App() {
  return (
    <Router>
  <div className="App">
    <Navbar />
    <Switch>
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/wallet" component={Wallet} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route exact path="/passwordreset/:resetToken" component={ResetPassword}
          />

      <Route exact path="/register" component={RegisterScreen} />
    </Switch>
  </div>
  </Router>
  );
}

export default App;
