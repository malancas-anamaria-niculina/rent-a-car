import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

const Row = ({key, row}) => {
  const [open, setOpen] = useState(false);
  console.log('Row', row);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.model}
        </TableCell>
        <TableCell align="right">{row.carType}</TableCell>
        <TableCell align="right">{row.odometer}</TableCell>
        <TableCell align="right">{row.year}</TableCell>
        <TableCell align="right">{row.availability}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Rental start date</TableCell>
                    <TableCell>Rental end date</TableCell>
                    <TableCell>Price per hour</TableCell>
                    <TableCell align="right">Total renting hours</TableCell>
                    <TableCell align="right">Total cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.rentalStartDate}>
                      <TableCell component="th" scope="row">
                        {historyRow.rentalStartDate}
                      </TableCell>
                      <TableCell>{historyRow.rentalEndDate}</TableCell>
                      <TableCell>{historyRow.pricePerHour}</TableCell>
                      <TableCell align="right">{historyRow.totalRentingHours}</TableCell>
                      <TableCell align="right">{historyRow.totalCost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CarActivity() {
    function createData(model, carType, odometer, year, availability, price) {
        return {
            model,
            carType,
            odometer,
            year,
            availability,
          history: [
            {
                rentalStartDate:  "2023-06-10T21:20:59.432794",
                rentalEndDate:  "2023-06-10T21:21:10.680274",
                pricePerHour: price,
                totalRentingHours: 0.0031,
                totalCost: 0.123
            },
            {
                rentalStartDate:  "2023-06-10T21:20:59.432794",
                rentalEndDate:  "2023-06-10T21:21:10.680274",
                pricePerHour: price,
                totalRentingHours: 0.0031,
                totalCost: 0.123
            },
          ],
        };
      }

    const rows = [
        createData('Hyundai Grand i10 Nios', 'Budget', 150, 2022, 'Available', 40),
        createData('Hyundai Grand i10', 'Budget', 150, 2022, 'Available', 40),
      ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Car name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Odometer</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Availability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (<Row key={row.model} row={row} />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}