import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Button, Chip, IconButton } from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import { getBookingList } from "../../state/Booking/Action";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BookingTable() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { booking,auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  React.useEffect(() => {
    
    dispatch(getBookingList({jwt}))
  }, []);

  return (
    <div>
      <h1 className="font-bold py-3 text-2xl">Booking List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>id</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell align="right">Details</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking.bookings?.map((item) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.student.fullName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.teacher.fullName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.status}
                </TableCell>
                
                <TableCell align="right">
                  <Button onClick={()=>navigate(`/booking/${item.id}`)} size="small">Details</Button>
                </TableCell>
               
                <TableCell align="right">
                  <IconButton color="">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
