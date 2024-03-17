import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUpdateBookingRequest,
  getBookingById,
  getUpdateBookingRequest,
  processUpdateBookingRequest,
  updateBookingDetails,
} from "../../state/Booking/Action";
import { Button, Chip, IconButton, TextField } from "@mui/material";
import { BookingDetailsCard } from "./BookingDetailsCard";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const BookingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const { id } = useParams();
  const [completedMinutes, setCompleteMinutes] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  useEffect(() => {
    dispatch(getBookingById({ id, jwt }));
    dispatch(getUpdateBookingRequest({ bookingId: id, jwt }));
  }, []);

  const handleChange = (e) => {
    setCompleteMinutes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { completedMinutes };
    if (booking.booking.pendingMinute+completedMinutes > booking.booking.totalMinute) {
      alert('Completed minutes cannot exceed total minutes');
      console.log("not submit");
      return; 
    }
    
    dispatch(createUpdateBookingRequest({ jwt, bookingRequest: data, id: id }));
    setCompleteMinutes(0);
  };
  const handleProcessUpdateRequest = (confirmed) => {
    dispatch(
      processUpdateBookingRequest({
        requestId: booking.updateRequest.id,
        confirmed,
        jwt,
      })
    );
  };

  const handleUpdateBookingPaidAmount = (e) => {
    e.preventDefault();
    const data = { paidAmount };
    console.log("submit");
    dispatch(updateBookingDetails({ jwt, bookingRequest: data, id: id }));
    setPaidAmount(0);
  };
  const handleConfirmedBooking = (e) => {
    const data = { confirmed: true };
    dispatch(updateBookingDetails({ jwt, bookingRequest: data, id: id }));
  };
  return (
    <div>
      
      <div className="flex justify-center pt-5">
        <div className="lg:w-[60vw] flex items-center">
 <IconButton onClick={()=>navigate(-1)}><KeyboardBackspaceIcon/></IconButton>
      </div>
     
      </div>
      <div className="lg:flex justify-center mt-5 px-5 gap-5">
        <BookingDetailsCard item={booking.booking} />
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
          {auth.user?.role === "ROLE_ADMIN" && (
            <div className="border rounded-md p-5 flex justify-between">
              <h1 className="">Confirmed Booking </h1>
              <div>
                <Button
                  disabled={booking.booking?.confirmed}
                  variant="contained"
                  onClick={handleConfirmedBooking}
                  size="small"
                >
                  confirmed
                </Button>
              </div>
            </div>
          )}
          {auth.user?.role === "ROLE_ADMIN" && (
            <div className="border rounded-md p-5 flex justify-between items-center">
              <div>
                <TextField
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  type="text"
                  label="Amount..."
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  onClick={handleUpdateBookingPaidAmount}
                  size="small"
                >
                  update paid amount
                </Button>
              </div>
            </div>
          )}
          <div>
            {auth.user?.role === "ROLE_TEACHER" && (
              <form
                className="flex gap-5 justify-between"
                onSubmit={handleSubmit}
              >
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Enter Completed Minites"
                  variant="outlined"
                  onChange={handleChange}
                  value={completedMinutes}
                  type="number"
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ p: "0rem 1rem" }}
                  className=""
                  disabled={booking.updateRequest}
                >
                  Update
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      {booking.updateRequest && (
        <div className="mt-5 flex justify-center">
          <div className="lg:w-[60vw] flex items-center border  p-5 rounded-md justify-between">
            <div className="space-y-5">
              <div className="flex items-center">
                <p className="w-56">Request Id :</p>
                <p>{booking.updateRequest?.id}</p>
              </div>
              <div className="flex items-center">
                <p className="w-56">Completed Minutes :</p>
                <p>{booking.updateRequest?.completedMinutes}</p>
              </div>
              <div className="flex items-center">
                <p className="w-56">Confirmed :</p>
                <p>{booking.updateRequest?.confirmed ? "Yes" : "No"}</p>
              </div>
            </div>
            {auth.user?.role === "ROLE_STUDENT" ? (
              <div className="gap-5 flex flex-col">
                <Button
                  onClick={() => handleProcessUpdateRequest(true)}
                  variant="contained"
                >
                  Confirmed
                </Button>
                <Button
                  onClick={() => handleProcessUpdateRequest(false)}
                  color="error"
                  variant="contained"
                >
                  Decline
                </Button>
              </div>
            ) : (
              <p className="max-w-52 text-orange-500">
                Request created - Once student confirms, booking details will be
                updated
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
