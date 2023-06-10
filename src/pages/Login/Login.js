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

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    handleLogin,
    user: { token, error },
  } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await handleLogin({ email, password });
  };

  if (token) {
    return <Navigate replace to="/dashboard" />;
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
          <LoginHeader component="div">Login</LoginHeader>
          <LoginSubHeader component="div">
            Please log in to access your system
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
              Log in
            </SubmitButton>
            <ForgotLink
              component="div"
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
              onClick={() => navigate("/register")}
            >
              Don't have an account? Register here!
            </ForgotLink>
          </LoginStack>
        </form>
      </Stack>
    </FormBox>
  );
};

export default LoginPage;
