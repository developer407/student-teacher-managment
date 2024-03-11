import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherList } from "../../state/Authentication/Action";
import { Chip, IconButton } from "@mui/material";
import { Create, Delete } from "@mui/icons-material";
import { payTeacherAmount } from "../../state/Teacher/Action";
import { useNavigate } from "react-router-dom";



export default function TeachersTable() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const navigate=useNavigate();

  React.useEffect(() => {
    dispatch(getTeacherList(jwt));
  }, []);



  console.log("list", auth.teachers);
  return (
    <div>
      <h1 className="font-bold py-3 text-2xl">Teachers List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Fees</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auth.teachers?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.fullName}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.teacher?.subjects.map((sub) => (
                      <Chip label={sub} variant="outlined" />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="space-y-2">
                  {item.teacher?.availability.map((av) => (
                    <div className="flex gap-2 text-left">
                      <p className="w-10">{av.day}</p>
                      <span>-</span>
                      <p>{av.hours}h</p>
                    </div>
                  ))}
                </TableCell>
                <TableCell className="space-y-2" align="right">
                  {item.teacher?.grads.map((grad) => (
                    <div className="flex gap-2 text-left ">
                      <p className="w-28">{grad.grad}</p>
                      <span>-</span>
                      <span>${grad.fees}</span>
                    </div>
                  ))}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={()=>navigate(`/teacher/${item.teacher.id}`)}>
                    <Create />
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
