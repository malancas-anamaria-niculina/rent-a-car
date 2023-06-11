import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  Stack,
} from "@mui/material";
import {
  ElectricCar,
  MapRounded,
  LocalActivityRounded,
  CarRentalRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashboardWrapper = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "transparent", color: "#000" }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            component="div"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <ElectricCar /> Rent a Car
          </Typography>
          <Stack flexDirection="row">
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              style={{ gap: 4 }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <MapRounded />
              Map
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard/user-activity"
              style={{ gap: 4 }}
            >
              <LocalActivityRounded />
              User Activity
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/planned-activity"
              style={{ gap: 4 }}
              onClick={() => {
                navigate("/planned-activity");
              }}
            >
              <CarRentalRounded />
              Planned Activity
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard/settings"
              style={{ gap: 4 }}
            >
              <SettingsRounded />
              Settings
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <div style={{ flex: 1, padding: "20px 40px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardWrapper;
