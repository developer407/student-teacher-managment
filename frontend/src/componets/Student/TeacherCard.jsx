import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherList } from "../../state/Authentication/Action";
import { createBooking } from "../../state/Booking/Action";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  outline: "none",
  p: 4,
};

export const TeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    totalHours: '',
    subject: '',
    grad: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  React.useEffect(() => {
    dispatch(getTeacherList(jwt));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createBooking({
        jwt,
        bookingRequest: { teacherId: teacher.id, ...formData },
        navigate,
      })
    );
    console.log({ teacherId: teacher.id, ...formData })
  };
  
  return (
    <Card className="max-w-xl p-5">
      <p className="font-semibold text-2xl mb-3">{teacher.teacher?.fullName}</p>
      <p>
        {teacher.teacher?.description}
      </p>
      <div className="mt-5">
        <p className="font-semibold text-gray-800 pb-2">Subject</p>
        <div className="flex flex-wrap gap-1">
          {teacher?.teacher?.subjects?.map((sub) => (
            <Chip label={sub} variant="outlined" />
          ))}
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold text-gray-800 pb-2">Grads and fees</p>
        <div className="flex gap-2">
          {teacher?.teacher?.grads.map((item) => (
            <div className="p-5 border rounded-md">
              <p>{item.grad}</p>
              <p>${item.fees}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold text-gray-800 pb-2">Availability</p>
        <div className="flex gap-2">
          {teacher.teacher?.availability.map((item) => (
            <div className="p-5 border rounded-md">
              <p>{item.day}</p>
              <p>{item.hours}h</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        {
          <Button variant="contained" onClick={handleOpen}>
            Book Class
          </Button>
        }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Enter Minutes"
              variant="outlined"
              onChange={handleChange}
            //   value={totalHours}
              margin="normal"
              name="totalHours"
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel id="sub-simple-select-label">Subject</InputLabel>
              <Select
                labelId="sub-simple-select-label"
                id="sub-simple-select"
                label="Subject"
                onChange={handleChange}
                name="subject"
              >
                {teacher.teacher.subjects.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel id="grad-simple-select-label">Grade & Fees</InputLabel>
              <Select
                labelId="grad-simple-select-label"
                id="grad-simple-select"
                label="Grade & Fees"
                onChange={handleChange}
                name="grad"
              >
                {teacher.teacher.grads.map((item) => (
                  <MenuItem value={item}>
                    {item.grad} - ${item.fees}/minute
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              margin="normal"
              type="submit"
              variant="contained"
              sx={{ p: ".7rem 2rem" }}
              className=""
            >
              Book
            </Button>
          </form>
        </Box>
      </Modal>
    </Card>
  );
};
