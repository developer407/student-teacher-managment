import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTeacher } from "../../state/Teacher/Action";

const UpdateSubjectForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    subject: "",
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
          subjects: [formData.subject, ...auth.user?.teacher.subjects],
        },
        jwt,
      })
    );
    // navigate("/success");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="subject"
          variant="outlined"
          name="subject"
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

export default UpdateSubjectForm;
