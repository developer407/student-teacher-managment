import React, { useEffect } from "react";
import { BookingCard } from "./BookingCard";
import { getBookingHistory } from "../../state/Booking/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export const BookingHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getBookingHistory({ userId: auth.user.id, jwt }));
  }, []);

  return (
    <div className="lg:flex flex-col items-center">
      <div className=" pt-5 lg:w-[60vw] pb-5">
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </div>
      <div className="space-y-5">
        {booking.bookings.map((item) => (
          <BookingCard item={item} />
        ))}
      </div>
    </div>
  );
};
