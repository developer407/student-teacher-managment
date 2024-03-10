import logo from "./logo.svg";
import "./App.css";
import TeachersTable from "./componets/Admin/TeachersTable";
import LoginForm from "./Auth/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./componets/Home/Home";
import Navbar from "./componets/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AdminDashboard } from "./componets/Admin/AdminDashboard";
import { getUser } from "./state/Authentication/Action";
import { useEffect } from "react";
import CreateUserForm from "./Auth/Register";
import { BookingDetails } from "./componets/Admin/BookingDetails";
import { Student } from "./componets/Student/Student";
import { BookingHistory } from "./componets/Booking/BookingHistory";
import TeacherDashboard from "./componets/Teacher/TeacherDashboard";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUser(jwt));
  }, [auth.jwt]);
  return (
    <>
      {" "}
      {auth.user ? (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                auth.user.role === "ROLE_ADMIN" ? (
                  <AdminDashboard />
                ) : auth.user.role === "ROLE_TEACHER" ? (
                  <TeacherDashboard />
                ) : (
                  <Student />
                )
              }
            />
            <Route path="/bookings" element={<BookingHistory />} />
            <Route path="/booking/:id" element={<BookingDetails />} />
            <Route
              path="/add-user"
              element={
                <div className="mt-5 lg:mt-20">
                  <CreateUserForm />
                </div>
              }
            />
          </Routes>
        </>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoginForm />
        </div>
      )}
    </>
  );
}

export default App;
