import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import "./style.css";
import logoImage from "./ilchatu_hannah.png";
import { Link } from "react-router-dom";

const Login = () => {
  
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [studentnumber, setStudentnumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    

    setLoading(true);
    if (!email || /*!studentnumber ||*/ !password) {
      toast({
        title: "Please Fill in all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/user/login",
        { email, studentnumber, password },
        config
      );
      debugger
         console.log(data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5" align="center">
      <div class="container-auth" id="container-auth">
        <div class="form-container sign-in">
          <form>
            <div class="loginContainer">
              <h1 id="loginHeading">Login</h1>
            </div>
            <FormControl id="email" isRequired>
              {/* <FormLabel>Email</FormLabel> */}
              <Input
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="studentnumber" isRequired>
              {/* <FormLabel>Student Number</FormLabel> */}
              <Input
                value={studentnumber}
                placeholder="Student Number"
                onChange={(e) => setStudentnumber(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              {/* <FormLabel>Password</FormLabel> */}
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="7rem">
                  <Button
                    h="1.8rem"
                    size="sm"
                    onClick={handleClick}
                    className="showhide"
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="ForgetPassword">
              {/* <FormLabel>Student Number</FormLabel> */}
              {/* <Link to="/forgetPassword">Forget Password</Link> */}
              <Link to={`/forgetPassword`}>
  Go to Forget Password
</Link>
            </FormControl>

            <Button
              colorScheme="blue"
              width="100%"
              style={{ marginTop: "15px" }}
              onClick={submitHandler}
              isLoading={loading}
            >
              Login
            </Button>
          </form>
        </div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-panel toggle-right">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "40%",
                  transform: "translateX(-40%)",
                }}
              >
                <Box mb={2}>
                  <img
                    src={logoImage}
                    alt="iLearnU Logo"
                    className="logo"
                    style={{ width: "180px", height: "auto" }}
                  />
                </Box>
              </div>

              <div>
                <h1>Hi, aLUmni</h1>
                <p>
                  Please Enter your personal details to Connect with
                  iLchatUsers!
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </VStack>
  );
};

export default Login;
