import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById, updateBooking } from "../../state/Booking/Action";
import { Button, Chip, TextField } from "@mui/material";
import { BookingDetailsCard } from "./BookingDetailsCard";

export const BookingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const { id } = useParams();
  const [completedHours,setCompletedHours] =useState("")

  useEffect(() => {
    dispatch(getBookingById({ id, jwt }));
  }, []);
   
  const handleChange=(e)=>{
    setCompletedHours(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const data={completedHours}
    console.log("submit")
    dispatch(updateBooking({jwt,bookingRequest:data,id:id}))
    setCompletedHours(0)

  }
  return (
    <div className="lg:flex justify-center mt-5 px-5 gap-5">
      <BookingDetailsCard item={booking.booking}/>
      <div className="lg:w-[30vw] space-y-6">
        <div className="border rounded-md p-5 ">
          <h1 className="mb-5">Students Details </h1>
          <div className="flex justify-between">
            <p className="font-semibold">Full Name</p>
            <p className="">{booking.booking?.student.fullName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Email</p>
            <p className="">{booking.booking?.student.email}</p>
          </div>
        </div>
        <div className="border rounded-md p-5 ">
          <h1 className="mb-5">Teachers Details </h1>
          <div className="flex justify-between">
            <p className="font-semibold">Full Name</p>
            <p className="">{booking.booking?.teacher.fullName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Email</p>
            <p className="">{booking.booking?.teacher?.email}</p>
          </div>
        </div>
        <div >
          <form className="flex gap-5 justify-between" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Enter Completed Hours"
              variant="outlined"
              onChange={handleChange}
              value={completedHours}
            />
            <Button
             type="submit"
              variant="contained"
              sx={{ p: "0rem 1rem" }}
              className=""
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
