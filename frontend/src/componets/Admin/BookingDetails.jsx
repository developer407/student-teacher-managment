import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById } from "../../state/Booking/Action";
import { Chip } from "@mui/material";
import { BookingDetailsCard } from "./BookingDetailsCard";

export const BookingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBookingById({ id, jwt }));
  }, []);
  return (
    <div className="lg:flex justify-center mt-5 px-5">
      <BookingDetailsCard item={booking.booking}/>
    </div>
  );
};
