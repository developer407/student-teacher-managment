import { Create } from "@mui/icons-material";
import { Button, Card, Chip, Divider, Grid, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  return (
    <div className="p-5 lg:px-20">
      <Grid container spacing={5} className="">
        <Grid className="overflow-y-auto max-h-screen" item xs={12} lg={6}>
          <div className="space-y-5 w-full">
            <div>
              <h1 className="font-bold text-2xl">{auth.user?.fullName}</h1>
            </div>
            <Card className="p-5 w-full">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800 pb-2">Subject</p>
                <IconButton>
                  <Create />
                </IconButton>
              </div>
              <div className="flex flex-wrap gap-1">
                {auth?.user?.teacher?.subjects?.map((sub) => (
                  <Chip label={sub} variant="outlined" />
                ))}
              </div>
            </Card>
            <Card className="p-5 w-full">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800 pb-2">Subject</p>
                <IconButton>
                  <Create />
                </IconButton>
              </div>
              <div className="flex gap-2">
                {auth.user?.teacher?.grads.map((item) => (
                  <div className="p-5 border rounded-md">
                    <p>{item.grad}</p>
                    <p>${item.fees}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5 w-full">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800 pb-2">Availability</p>
                <IconButton>
                  <Create />
                </IconButton>
              </div>
              <div className="flex gap-2">
                {auth.user?.teacher?.availability.map((item) => (
                  <div className="p-5 border rounded-md">
                    <p>{item.day}</p>
                    <p>{item.hours}h</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Grid>
        <Grid item xs={0} lg={1}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid className="space-y-5" item xs={12} lg={5}>
        <div>
              <h1 className="font-bold text-2xl">Payment Details</h1>
            </div>
        <Card className="p-5 w-full">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800 pb-2">Pending Amount</p>
               <p className="">$990</p>
              </div>
              
            </Card>
            <Card className="p-5 w-full">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800 pb-2">Payment Method</p>
               <p className="">Western Union</p>
              </div>
              
            </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default TeacherDashboard;
