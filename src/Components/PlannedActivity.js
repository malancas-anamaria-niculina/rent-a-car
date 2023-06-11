import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useContext, useEffect } from "react";
import ActivityContext from "../contexts/ActivityContext";

const ActivityRow = ({ activity }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={activity.model} src="../static/images/car1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={activity.model}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Car type
              </Typography>
              {` — ${activity.carType}`}
              <br></br>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Odometer
              </Typography>
              {` — ${activity.odometer}`}
              <br></br>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Year
              </Typography>
              {` — ${activity.year}`}
              <br></br>
            </>
          }
        />
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            Planned activity
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Rental start date</TableCell>
                <TableCell>Rental end date</TableCell>
                <TableCell>Rental start hour</TableCell>
                <TableCell>Rental end hour</TableCell>
                <TableCell>Price per hour</TableCell>
                <TableCell align="right">Estimated renting hours</TableCell>
                <TableCell align="right">Estimated cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activity.activity.map((activityRow) => (
                <TableRow key={activityRow.rentalStartDate}>
                  <TableCell component="th" scope="row">
                    {activityRow.rentalStartDate}
                  </TableCell>
                  <TableCell>{activityRow.rentalEndDate}</TableCell>
                  <TableCell>{activityRow.rentalStartHour}</TableCell>
                  <TableCell>{activityRow.rentalEndHour}</TableCell>
                  <TableCell>{activityRow.pricePerHour}</TableCell>
                  <TableCell align="right">
                    {activityRow.estimatedRentingHours}
                  </TableCell>
                  <TableCell align="right">
                    {activityRow.estimatedCost}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default function PlannedActivity() {
  const { activity, handleActivity } = useContext(ActivityContext);

  useEffect(() => {
    handleActivity();
  }, []);

  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
      {activity.map((rentAtivity) => (
        <ActivityRow activity={rentAtivity}></ActivityRow>
      ))}
    </List>
  );
}
