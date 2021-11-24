import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (event) => {
    event.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

  
    return (
        <div>
            
        </div>
    )
}

export default ResetPassword
