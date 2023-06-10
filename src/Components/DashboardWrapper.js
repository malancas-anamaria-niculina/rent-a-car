import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const DashboardWrapper = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static" style={{ backgroundColor: "transparent" }}>
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ flex: 1, padding: "20px 40px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardWrapper;
