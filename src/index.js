import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "leaflet/dist/leaflet.css";
import { RentProvider } from "./contexts/RentContext";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <UserProvider>
      <RentProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </RentProvider>
    </UserProvider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
