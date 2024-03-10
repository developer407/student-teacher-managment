import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTeacher } from "../../state/Teacher/Action";
import CloseIcon from '@mui/icons-material/Close';

const UpdateAvailability = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    day: "",
    hours: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateTeacher({
        teacherRequest: {
          availability: [{ ...formData }, ...auth.user?.teacher.availability],
        },
        jwt,
      })
    );
  };

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="day"
          variant="outlined"
          name="day"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="hours"
          variant="outlined"
          name="hours"
          onChange={handleChange}
          fullWidth
        />
        <div>
          <Button fullWidth type="submit" variant="contained" margin="normal">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAvailability;
