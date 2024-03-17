import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacherById, payTeacherAmount } from "../../state/Teacher/Action";
import { getBookingHistory } from "../../state/Booking/Action";
import { BookingCard } from "../Booking/BookingCard";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const TeacherDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, teacher, booking } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getTeacherById({ id, jwt }));
  }, [id]);

  const [formData, setFormData] = useState({
    amount: "",
    teacherId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayTeacherAmount = (e) => {
    e.preventDefault();
    const data = { amount: formData.amount, teacherId: id };
    dispatch(payTeacherAmount({ teacherRequest: data, jwt }));
    setFormData({ amount: "" });
  };

  useEffect(() => {
    dispatch(getBookingHistory({ userId: id, jwt }));
  }, []);

  return (

    <div className="p-5 lg:px-20 ">
      <div>
         <IconButton onClick={()=>navigate(-1)}><KeyboardBackspaceIcon/></IconButton>
     
      </div>
      <div >
      <Grid container spacing={5}>
        <Grid item sx={12} lg={6}>
          <Card className=" p-5">
            <div className="space-y-2">
              <p className="font-semibold text-2xl ">
                {teacher.teacher?.fullName}
              </p>
              <p>{teacher.teacher?.description}</p>
            </div>
            <div className="mt-5">
              <p className="font-semibold text-gray-800 pb-2">Subject</p>
              {teacher?.teacher?.subjects.length>0 ? <div className="flex flex-wrap gap-1">
                {teacher?.teacher?.subjects?.map((sub) => (
                  <Chip label={sub} variant="outlined" />
                ))}
              </div>:
              <div>
                <p className=" text-lg font-serif">
                  no subject added by teacher...
                </p>
              </div>}
            </div>
            <div className="mt-5">
              <p className="font-semibold text-gray-800 pb-2">Grads and fees</p>
              {teacher.teacher?.grads?.length>0 ? <div className="flex gap-2">
                {teacher?.teacher?.grads.map((item) => (
                  <div className="p-5 border rounded-md">
                    <p>{item.grad}</p>
                    <p>${item.fees}</p>
                  </div>
                ))}
              </div>: <div>
                <p className=" text-lg font-serif">
                  no grads and fees added by teacher...
                </p>
              </div>}
            </div>
            <div className="mt-5">
              <p className="font-semibold text-gray-800 pb-2">Availability</p>
              {teacher.teacher?.availability?.length>0?<div className="flex gap-2">
                {teacher.teacher?.availability.map((item) => (
                  <div className="p-5 border rounded-md">
                    <p>{item.day}</p>
                    <p>{item.hours}h</p>
                  </div>
                ))}
              </div>:<div>
                <p className=" text-lg font-serif">
                  no availability added by teacher...
                </p>
              </div>}
            </div>
          </Card>
        </Grid>
        <Grid item className="space-y-5" xs={12} lg={6}>
          <div>
            <h1 className="font-bold text-2xl">Payment Details</h1>
          </div>
          <Card className="p-5 w-full">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800 pb-2">
                Total Paid Amount
              </p>
              <p className="">${teacher.teacher?.totalPaidAmount}</p>
            </div>
          </Card>
          <Card className="p-5 w-full">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800 pb-2">Pending Amount</p>
              <p className="">${teacher.teacher?.pendingAmount}</p>
            </div>
          </Card>
          <Card className="p-5 w-full">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800 pb-2">Payment Method</p>
              <p className="font-semibold text-gray-900 mb-2">
                {teacher.teacher?.paymentMethod}
              </p>
            </div>
            {teacher.teacher?.paymentMethod ? (
              <div>
                {teacher.teacher?.paymentMethod === "WESTERN_UNION" ? (
                  <div className="flex justify-between">
                    <p>Full Name</p>
                    <p>{teacher.teacher?.westernUnionName}</p>
                  </div>
                ) : (
                  <div className="space-y-2 ">
                    <div className="flex justify-between">
                      <p>Account No</p>
                      <p>{teacher.teacher?.accountNo}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Ifc Code</p>
                      <p>{teacher.teacher?.ifcCode}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p className="py-5 text-lg font-serif">
                  no payment method selected...
                </p>
              </div>
            )}
          </Card>
          <Card className="p-5">
            <h1 className="pb-3 font-semibold text-xl">
              Send Money To Teacher
            </h1>
            <form
              onSubmit={handlePayTeacherAmount}
              className="flex gap-2 items-center"
            >
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

      <div className="lg:p-10">
        {booking.bookings.map((item) => (
          <BookingCard item={item} />
        ))}
      </div>
    </div>

    </div>
    
  );
};
