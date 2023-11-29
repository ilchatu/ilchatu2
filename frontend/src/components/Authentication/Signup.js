import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import "./style.css";
import logoImage from "./ilchatu_hannah.png";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [studentnumber, setStudentnumber] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if (!/^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(name) || !/\s/.test(name)) {
      console.log("Invalid Name");
      toast({
        title: "Invalid Name",
        description: "Please enter a valid Full Name",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
     
    if (!email.endsWith("com")) {
      debugger
      console.log("Invalid email");
      toast({
        title: "Invalid Email",
        description: "Please enter a valid Email Address",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          studentnumber,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successfully and link is also send successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //localStorage.setItem("userInfo", JSON.stringify(data));
      history.push(`/verify-email/${data.verificationToken}`);
      setPicLoading(false);
   //   history.push("/chats");
   history.push("/");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ilchatu");
      data.append("cloud_name", "ilchatu");
      fetch("https://api.cloudinary.com/v1_1/ilchatu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <div class="container-auth" id="container-auth">
        <div class="form-container sign-up">
          <form>
            <div class="loginContainer">
              <h1 id="loginHeading">Sign Up</h1>
            </div>
            <FormControl id="first-name" isRequired>
              {/* <FormLabel>Name</FormLabel> */}
              <Input
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              {/* <FormLabel>Email Address</FormLabel> */}
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="studentnumber" isRequired>
              {/* <FormLabel>Student Number</FormLabel> */}
              <Input
                type="studentnumber"
                placeholder="Student Number"
                onChange={(e) => setStudentnumber(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              {/* <FormLabel>Password</FormLabel> */}
              <InputGroup size="md">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Password"
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
            <FormControl id="password" isRequired>
              {/* <FormLabel>Confirm Password</FormLabel> */}
              <InputGroup size="md">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmpassword(e.target.value)}
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
            <FormControl id="pic">
              <FormLabel>Upload a Profile</FormLabel>
              <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={submitHandler}
              isLoading={picLoading}
            >
              Sign Up
            </Button>
          </form>
        </div>
        <div class="toggle-container-signup">
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
                <h1 style={{ textAlign: "center" }}>Welcome to iLchatU!</h1>
                <p>
                  Sign up with your personal details to Connect with
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

export default Signup;
