import React, { useEffect } from "react";
import { BookingDetailsCard } from "../Admin/BookingDetailsCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookingById } from "../../state/Booking/Action";

export const BookingSuccess = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { booking,auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getBookingById({ jwt, id }));
  }, []);

  return (
    <div>
        <h1>Booking Success</h1>
      <BookingDetailsCard item={booking.booking}/>
    </div>
  );
};
