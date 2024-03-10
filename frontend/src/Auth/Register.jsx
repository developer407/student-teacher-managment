import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../state/Authentication/Action";

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 8 characters")
        .required("Password is required"),
      role: Yup.string().required("Type is required"),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
      dispatch(createUser({ userData: values, navigate }));
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography className="text-center" variant="h5">
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Full Name"
            name="fullName"
            id="fullName"
            autoComplete="fullName"
            helperText={formik.errors.fullName}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            id="email"
            autoComplete="email"
            helperText={formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            id="password"
            helperText={formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
       
          <FormControl margin="normal" fullWidth>
            <InputLabel id="role-simple-select-label">Role</InputLabel>
            <Select
            
              labelId="role-simple-select-label"
              id="demo-simple-select"
              label="Role"
              className="outline-none w-full rounded-md"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              <MenuItem value="ROLE_TEACHER">TEACHER</MenuItem>
              <MenuItem value="ROLE_STUDENT">STUDENT</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3,p:"1rem" }}
          >
            Register
          </Button>
        </form>
        {/* <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account ?{" "}
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Typography> */}
      </div>
    </Container>
  );
};

export default CreateUserForm;
