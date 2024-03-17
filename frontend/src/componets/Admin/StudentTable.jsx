import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getStudentList, getTeacherList } from "../../state/Authentication/Action";
import { Chip, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

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

export default function StudentsTable() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  React.useEffect(() => {
    
    dispatch(getStudentList(jwt));
  }, []);

  console.log("student list", auth.students);
  return (
    <div>
      <h1 className="font-bold py-3 text-2xl">Student List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              {/* <TableCell align="right">Remove</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {auth.students?.map((item) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.fullName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.email}
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
        {auth.students?.length === 0 && <div>
        <p className="text-center p-5 font-semibold text-2xl">no students available...</p>
      </div>}
      </TableContainer>
    </div>
  );
}
