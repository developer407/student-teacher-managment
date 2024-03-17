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
              <TableCell align="right">Update</TableCell>
              {/* <TableCell align="right">Remove</TableCell> */}
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
                  <IconButton onClick={()=>navigate(`/booking/${item.id}`)} color="">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                {/* <TableCell align="right">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {booking.bookings?.length === 0 && <div>
        <p className="text-center p-5 font-semibold text-2xl">no booking available...</p>
      </div>}
      </TableContainer>
    </div>
  );
}
