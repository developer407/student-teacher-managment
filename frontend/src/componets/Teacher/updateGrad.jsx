import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTeacher } from "../../state/Teacher/Action";

const UpdateGradForm = ({handleClose}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    grad: "",
    fees: "",
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
          grads: [{ ...formData }, ...auth.user.teacher.grads],
        },
        jwt,
      })
    );
    handleClose()
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="grad"
          variant="outlined"
          name="grad"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="fees"
          variant="outlined"
          name="fees"
          onChange={handleChange}
          fullWidth
        />
        <Button fullWidth type="submit" variant="contained" margin="normal">
          submit
        </Button>
      </form>
    </div>
  );
};

export default UpdateGradForm;
