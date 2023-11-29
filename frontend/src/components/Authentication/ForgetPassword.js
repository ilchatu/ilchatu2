import "./ForgetPassword.css";
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";

function ForgetPassword() {
  const history = useHistory();
  const toast = useToast();
  useEffect(() => {
    
   console.log("forgetpassword");
  });
  
 
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/auth/forget-password",
        { email },
        config
      );
    console.log(data);
    toast({
      title: "Reset link send Successfully ",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    history.push("/");
    
    } catch (error) {
      console.error('Error fetching email token:', error);
    }
  };

  return (
    <div className="container1">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control w-25"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
