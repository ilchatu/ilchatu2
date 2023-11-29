import "./ForgetPassword.css";
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const bcrypt = require("bcryptjs");
function ResetNewPassword(){

    const { param1, param2 } = useParams();

    useEffect(() => {
    
        console.log("Resetpassword");
       });
       
      
       const [userId, setUserId] = useState(param1); // Assuming param1 is the UserId
       const [token, setToken] = useState(param2); // Assuming param2 is the Token
       const [password,SetNewPassword]=useState('');
       const [ConfirmPassword,SetConfirmPassWord]=useState('');

     
       const handleSubmit = async (e) => {
        debugger;
        console.log(userId);
        console.log(token);
         e.preventDefault();
     
         try {
           const config = {
             headers: {
               "Content-type": "application/json",
             },
           };
           const { data } = await axios.post(
             "api/auth/SetNewpassword",
             {userId,token,password},
             config
           );
           console.log(data);
         } catch (error) {
           console.error('Error fetching email token:', error);
         }
       };


    return (
        <>
         <div className="container1">
    <h2>Create New Password</h2>
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="NewPassword">NewPassword</label>
        <input
          type="text"
          id="newpassword"
          className="form-control w-25"
          value={password}
          onChange={(e) => SetNewPassword(e.target.value)}
          required
        />
        <label htmlFor="ConfirmPassword">ConfirmPassword</label>
        <input
          type="text"
          id="confirmpassword"
          className="form-control w-25"
          value={ConfirmPassword}
          onChange={(e) => SetConfirmPassWord(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
      Set New Password 
      </button>
    </form>
  </div>
        </>
    )

   
}

export default ResetNewPassword;