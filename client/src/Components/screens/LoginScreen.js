import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import isAuth from "../../Helpers/isAuth";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {globalAuth, setGlobalAuth} = useContext(isAuth)


  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history, setGlobalAuth, globalAuth]);
  
  const loginHandler = async (event) => {
    event.preventDefault();
    setGlobalAuth(true)
    
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
        );
        // console.log(data)
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("userID", data.user);
        setGlobalAuth(true)
        console.log(globalAuth)
        window.location.reload(false)

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            tabIndex={2}
          />
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;