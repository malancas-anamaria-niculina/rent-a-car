import React, { useState, useContext } from "react";
import {
  LoginInput,
  LoginStack,
  LoginHeader,
  LoginSubHeader,
  LoginInputLabel,
  LogoHeader,
  ForgotLink,
  SubmitButton,
  FormBox,
} from "./styles";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import { Stack, FormControl } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    handleRegister,
    user: { token, error, isCreated },
  } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await handleRegister({ email, password, username, confirmPassword });
  };

  if (token || isCreated) {
    return <Navigate replace to="/" />;
  }

  return (
    <FormBox>
      <Stack spacing={4}>
        <LoginStack flexDirection="row" alignItems="left">
          <LogoHeader component="div">
            <ElectricCarIcon /> Rent a Car
          </LogoHeader>
        </LoginStack>
        <LoginStack spacing={1} textAlign="left">
          <LoginHeader component="div">Register</LoginHeader>
          <LoginSubHeader component="div">
            Create a new account to access the system!
          </LoginSubHeader>
        </LoginStack>
        <form
          style={{ display: "flex", justifyContent: "center" }}
          onSubmit={handleFormSubmit}
        >
          <LoginStack spacing={4}>
            <FormControl>
              <LoginInputLabel htmlFor="email" shrink={true} variant="standard">
                Email
              </LoginInputLabel>
              <LoginInput
                id="email"
                placeholder={"Enter your email address"}
                onChange={handleEmailChange}
                disableUnderline
              />
            </FormControl>
            <FormControl>
              <LoginInputLabel
                htmlFor="username"
                shrink={true}
                variant="standard"
              >
                Username
              </LoginInputLabel>
              <LoginInput
                id="username"
                placeholder={"Enter your username"}
                onChange={handleUsernameChange}
                disableUnderline
              />
            </FormControl>
            <FormControl>
              <LoginInputLabel
                htmlFor="password"
                shrink={true}
                variant="standard"
              >
                Password
              </LoginInputLabel>
              <LoginInput
                id="password"
                placeholder={"Enter your desired password"}
                onChange={handlePasswordChange}
                type="password"
                disableUnderline
              />
            </FormControl>
            <FormControl>
              <LoginInputLabel
                htmlFor="confirmpassword"
                shrink={true}
                variant="standard"
              >
                Confirm Password
              </LoginInputLabel>
              <LoginInput
                id="confirmpassword"
                placeholder={"Reenter your desired password"}
                onChange={handleConfirmPasswordChange}
                type="password"
                disableUnderline
              />
            </FormControl>
            {error && (
              <ForgotLink
                component="div"
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                  color: "red",
                }}
              >
                {error}
              </ForgotLink>
            )}
            <SubmitButton
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Register
            </SubmitButton>
            <ForgotLink
              component="div"
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
              onClick={() => navigate("/")}
            >
              Already have an account? Log in here!
            </ForgotLink>
          </LoginStack>
        </form>
      </Stack>
    </FormBox>
  );
};

export default RegisterPage;
