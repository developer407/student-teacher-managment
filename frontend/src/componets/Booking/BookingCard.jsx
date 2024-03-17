import { Button, Card, Chip, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BookingDetailsCard } from "../Admin/BookingDetailsCard";
import { getBookingById, updateBooking } from "../../state/Booking/Action";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const BookingCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBookingById({ id, jwt }));
  }, []);

  return (
    <div className="lg:w-[60vw]">
      <Card
        onClick={() => navigate(`/booking/${item.id}`)}
        className="p-5 lg:flex gap-5 cursor-pointer "
      >
        <div className="space-y-2 w-full">
          <div className="flex justify-between">
            <p > Booking Id:</p> <p>{item?.id} </p>
          </div>
          <div className="flex justify-between">
            <p > Total Booked Minutes: </p>
            <p>{item?.totalHours} </p>
          </div>
          <div className="flex justify-between">
            <p >Status:</p>

            <Chip
              color={item?.status === "PENDING" ? "warning" : "success"}
              label={item?.status}
            />
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="w-full">
          {auth.user.role === "ROLE_TEACHER" ? (
            <div className="">
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
          ) : (
            <div className=" ">
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
          )}
          <div></div>
        </div>
      </Card>
    </div>
  );
};
