import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing/Landing"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import LoginScreen from "./Components/screens/LoginScreen";
import Dashboard from "./Pages/Dashboard/Dashboard"


function App() {
  return (
    <Router>
  <div className="App">
    <Switch>
      <ProtectedRoute exact path="/" component={Landing} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/login" component={LoginScreen} />
    </Switch>
  </div>
  </Router>
  );
}

export default App;
