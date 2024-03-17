import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTeacher } from "../../state/Teacher/Action";

const UpdatePaymentMethodForm = ({handleClose}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth , teacher} = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    paymentMethod: "NET_BANKING",
    accountNo: "",
    ifcCode: "",
    westernUnionName: "",
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
          paymentMethod: formData.paymentMethod,
          accountNo: formData.accountNo,
          ifcCode: formData.ifcCode,
          westernUnionName: formData.westernUnionName,
        },
        jwt,
      })
    );
    handleClose();
  };

  useEffect(()=>{
    setFormData({paymentMethod: auth?.user?.teacher?.paymentMethod,
    accountNo: auth?.user?.teacher?.accountNo,
    ifcCode: auth?.user?.teacher?.ifcCode,
    westernUnionName: auth?.user?.teacher?.westernUnionName,
  })

  },[teacher.teacher]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="payment-simple-select-label">
            Payment Method
          </InputLabel>
          <Select
            labelId="payment-simple-select-label"
            id="payment-simple-select"
            value={formData.paymentMethod}
            label="Payment Method"
            onChange={handleChange}
            name="paymentMethod"
          >
            <MenuItem value={"NET_BANKING"}>NET BANKING</MenuItem>
            <MenuItem value={"WESTERN_UNION"}>WESTERN UNION</MenuItem>
          </Select>
        </FormControl>
        {formData.paymentMethod === "NET_BANKING" ? (
          <>
            <TextField
              margin="normal"
              label="accountNo"
              variant="outlined"
              name="accountNo"
              onChange={handleChange}
              fullWidth
              value={formData.accountNo}
            />
            <TextField
              margin="normal"
              label="ifcCode"
              variant="outlined"
              name="ifcCode"
              onChange={handleChange}
              fullWidth
              value={formData.ifcCode}
            />
          </>
        ) : (
          <TextField
            margin="normal"
            label="westernUnionName"
            variant="outlined"
            name="westernUnionName"
            onChange={handleChange}
            fullWidth
            value={formData.westernUnionName}
          />
        )}
        <Button fullWidth type="submit" variant="contained" margin="normal">
          submit
        </Button>
      </form>
    </div>
  );
};

export default UpdatePaymentMethodForm;
