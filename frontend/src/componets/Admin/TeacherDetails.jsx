import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTeacherById, payTeacherAmount } from "../../state/Teacher/Action";

export const TeacherDetails = () => {
  const dispatch = useDispatch();
  const { auth, teacher } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getTeacherById({ id, jwt }));
  }, [id]);

  const [formData, setFormData] = useState({
    amount: '',
    teacherId: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayTeacherAmount=(e)=>{
    e.preventDefault();
    const data={amount:formData.amount,teacherId:id}
    dispatch(payTeacherAmount({teacherRequest:data,jwt}))
    setFormData({amount:''})
  }

  return (
    <div className="p-5 lg:px-20">
      <Grid container>
        <Grid sx={12} lg={6}>
       
          <Card className="max-w-xl p-5">
            <p className="font-semibold text-2xl ">{teacher.fullName}</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
              magnam totam aut voluptas corporis suscipit, et omnis! Dicta, cum,
              consequuntur nam excepturi, reprehenderit sunt deleniti officia
              animi voluptatum iure rem!
            </p>
            <div className="mt-5">
              <p className="font-semibold text-gray-800 pb-2">Subject</p>
              <div className="flex flex-wrap gap-1">
                {teacher?.teacher?.subjects?.map((sub) => (
                  <Chip label={sub} variant="outlined" />
                ))}
              </div>
            </div>
            <div className="mt-5">
              <p className="font-semibold text-gray-800 pb-2">Grads and fees</p>
              <div className="flex gap-2">
                {teacher?.teacher?.grads.map((item) => (
                  <div className="p-5 border rounded-md">
                    <p>{item.grad}</p>
                    <p>${item.fees}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <p className="font-semibold text-gray-800 pb-2">Availability</p>
              <div className="flex gap-2">
                {teacher.teacher?.availability.map((item) => (
                  <div className="p-5 border rounded-md">
                    <p>{item.day}</p>
                    <p>{item.hours}h</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Grid>
        <Grid className="space-y-5" xs={12} lg={6}>
          <div>
            <h1 className="font-bold text-2xl">Payment Details</h1>
          </div>
          <Card className="p-5 w-full">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800 pb-2">Total Paid Amount</p>
              <p className="">${teacher.teacher?.totalPaidAmount}</p>
            </div>
          </Card>
          <Card className="p-5 w-full">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800 pb-2">Pending Amount</p>
              <p className="">${teacher.teacher?.pendingAmount}</p>
            </div>
          </Card>
          <Card className="p-5">
            <h1 className="pb-3 font-semibold text-xl">Send Money To Teacher</h1>
            <form onSubmit={handlePayTeacherAmount} className="flex gap-2 items-center">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Amount to be paid"
                variant="outlined"
                onChange={handleChange}
                value={formData.amount}
                margin="normal"
                name="amount"
              />
              <div>
                <Button
                  margin="normal"
                  type="submit"
                  variant="contained"
                  sx={{ p: ".8rem 2rem" }}
                  className=""
                >
                  Pay
                </Button>
              </div>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
