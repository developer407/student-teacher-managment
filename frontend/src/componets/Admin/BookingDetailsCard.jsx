import { Box, Button, Chip, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById, updateBooking } from "../../state/Booking/Action";
import { useDispatch, useSelector } from "react-redux";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

export const BookingDetailsCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [completedHours,setCompletedHours] =useState(0)
 
  const handleChange=(e)=>{
    setCompletedHours(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const data={completedHours}
    console.log("submit")
    dispatch(updateBooking({jwt,bookingRequest:data,id:item.id}))

  }
  return (
    <div className="lg:flex gap-5">
      <div className="lg:w-[30vw]  p-5 border rounded-md">
        <h1 className="pb-5 text-3xl font-semibold">Booking Details</h1>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="w-52"> Booking Id:</p> <p>{booking.booking?.id} </p>
          </div>
          <div className="flex justify-between">
            <p className="w-52"> Total Booked Hours: </p>
            <p>{booking.booking?.totalHours} </p>
          </div>
          <div className="flex justify-between">
            <p className="w-52"> Pendding Hours: </p>
            {booking.booking?.pendingHours}
          </div>
          <div className="flex justify-between">
            <p className="w-52"> Completed Hours: </p>
            {booking.booking?.completedHours}
          </div>
          <div className="flex justify-between">
            {" "}
            <p className="w-52"> Fees: </p> {599}
          </div>
          <div className="flex justify-between">
            {" "}
            <p className="w-52"> Grad: </p> {"Graduate"}
          </div>
          <div className="flex justify-between">
            {" "}
            <p className="w-52"> Subject: </p> {"Django"}
          </div>
          <div className="flex justify-between">
            <p className="w-52">Status:</p>

            <Chip
              color={
                booking.booking?.status === "PENDING" ? "warning" : "success"
              }
              label={booking.booking?.status}
            />
          </div>
        </div>
      </div>
      <div className="lg:w-[30vw] space-y-6">
        <div className="border rounded-md p-5 ">
          <h1 className="mb-5">Students Details </h1>
          <div className="flex justify-between">
            <p className="font-semibold">Full Name</p>
            <p className="">{item?.student.fullName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Email</p>
            <p className="">{item?.student.email}</p>
          </div>
        </div>
        <div className="border rounded-md p-5 ">
          <h1 className="mb-5">Teachers Details </h1>
          <div className="flex justify-between">
            <p className="font-semibold">Full Name</p>
            <p className="">{item?.teacher.fullName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Email</p>
            <p className="">{item?.teacher?.email}</p>
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
            />
            <Button
             type="submit"
              variant="contained"
              sx={{ p: "1rem" }}
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
