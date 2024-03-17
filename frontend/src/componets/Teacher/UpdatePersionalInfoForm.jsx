import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTeacher } from "../../state/Teacher/Action";

const UpdatePersionalInfoForm = ({handleClose}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth, teacher } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    fullName: "",
    description: "",
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
          fullName:formData.fullName,
          description: formData.description,
        },
        jwt,
      })
    );
    console.log("formdata ",formData);
    handleClose();
   
  };
  useEffect(()=>{
    setFormData({
      fullName: auth?.user?.teacher?.fullName,
      description: auth?.user?.teacher?.description,
    })
  },[teacher.teacher]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="fullName"
          variant="outlined"
          name="fullName"
          onChange={handleChange}
          fullWidth
          value={formData.fullName}
        />
        <TextField
          margin="normal"
          label="description"
          variant="outlined"
          name="description"
          onChange={handleChange}
          fullWidth
          value={formData.description}
        />
        <Button fullWidth type="submit" variant="contained" margin="normal">
          submit
        </Button>
      </form>
    </div>
  );
};

export default UpdatePersionalInfoForm;
