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
  const [completedHours,setCompletedHours] =useState("")
 
  const handleChange=(e)=>{
    setCompletedHours(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const data={completedHours}
    console.log("submit")
    dispatch(updateBooking({jwt,bookingRequest:data,id:item.id}))
    setCompletedHours(0)

  }
  return (
    <div className="">
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
            <p className="w-52 text-red-600 font-semibold"> Pendding Hours: </p>
            {booking.booking?.pendingHours}
          </div>
          <div className="flex justify-between">
            <p className="w-52 text-green-600 font-semibold"> Completed Hours: </p>
            {booking.booking?.completedHours}
          </div>
          <div className="flex justify-between">
            {" "}
            <p className="w-52"> Fees: </p> <p>${item?.grad?.fees}</p>
          </div>
          <div className="flex justify-between">
            {" "}
            <p className="w-52"> Grad: </p> <p>{item?.grad?.grad}</p>
          </div>
          <div className="flex justify-between">
            {" "}
            <p className="w-52"> Subject: </p> <p>{item?.subject}</p>
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
     
    </div>
  );
};
