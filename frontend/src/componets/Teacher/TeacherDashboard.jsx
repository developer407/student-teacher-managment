import { Create, Update } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UpdateSubjectForm from "./UpdateSubjectForm";
import UpdateGradForm from "./updateGrad";
import UpdateAvailability from "./updateAvailability";
import CloseIcon from "@mui/icons-material/Close";
import { updateTeacher } from "../../state/Teacher/Action";
import UpdatePaymentMethodForm from "./UpdatePaymentMethod";
import UpdatePersionalInfoForm from "./UpdatePersionalInfoForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};
function TeacherDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [updateForm, setUpdateForm] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (section) => {
    setOpen(true);
    setUpdateForm(section);
  };
  const handleClose = () => {
    setUpdateForm(null);
    setOpen(false);
  };

  const handleRemoveAvailabilities = (indexToRemove) => {
    let array = [...auth.user?.teacher.availability];
    array.splice(indexToRemove, 1);
    dispatch(
      updateTeacher({
        teacherRequest: {
          availability: array,
        },
        jwt,
      })
    );
  };

  const handleRemoveGrad = (indexToRemove) => {
    let array = [...auth.user?.teacher.grads];
    array.splice(indexToRemove, 1);
    dispatch(
      updateTeacher({
        teacherRequest: {
          grads: array,
        },
        jwt,
      })
    );
  };

  const handleRemoveSubject = (indexToRemove) => {
    let array = [...auth.user?.teacher.subjects];
    array.splice(indexToRemove, 1);
    dispatch(
      updateTeacher({
        teacherRequest: {
          subjects: array,
        },
        jwt,
      })
    );
  };

  return (
    <div className="p-5 lg:px-20">
      <Grid container spacing={5} className="">
        <Grid className="overflow-y-auto max-h-screen" item xs={12} lg={6}>
          <div className="space-y-5 w-full pb-5">
            <Card className="p-5">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800 pb-2">
                  Presional Information
                </p>
                <IconButton onClick={() => handleOpen("persionalInfo")}>
                  <Create />
                </IconButton>
              </div>
              <div className="space-y-2">
                <h1 className="font-bold text-2xl">
                  {auth.user?.teacher?.fullName}
                </h1>
                <p>{auth.user?.teacher?.description}</p>
              </div>
            </Card>
            <Card className="p-5 w-full">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800 pb-2">Subject</p>
                <IconButton onClick={() => handleOpen("subject")}>
                  <Create />
                </IconButton>
              </div>
              <div className="flex flex-wrap gap-1">
                {auth?.user?.teacher?.subjects?.map((sub, index) => (
                  <div className="relative group">
                    <Chip label={sub} variant="outlined" />
                    <div className="absolute top-1 right-0 hidden group-hover:block">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveSubject(index)}
                      >
                        <CloseIcon sx={{ fontSize: "15px", color: "red" }} />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5 w-full">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800 pb-2">Grads & Fees</p>
                <IconButton onClick={() => handleOpen("grad")}>
                  <Create />
                </IconButton>
              </div>
              <div className="flex gap-2">
                {auth.user?.teacher?.grads.map((item, index) => (
                  <div className="p-5 border rounded-md relative group">
                    <div className="absolute top-0 right-0 hidden group-hover:block">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveGrad(index)}
                      >
                        <CloseIcon sx={{ fontSize: "15px", color: "red" }} />
                      </IconButton>
                    </div>
                    <p>{item.grad}</p>
                    <p>${item.fees}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5 w-full">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800 pb-2">Availability</p>
                <IconButton onClick={() => handleOpen("availability")}>
                  <Create />
                </IconButton>
              </div>
              <div className="flex gap-2 ">
                {auth.user?.teacher?.availability.map((item, index) => (
                  <div className="p-5 border rounded-md relative group">
                    <div className="absolute top-0 right-0 hidden group-hover:block">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveAvailabilities(index)}
                      >
                        <CloseIcon sx={{ fontSize: "15px", color: "red" }} />
                      </IconButton>
                    </div>
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
              <p className="font-semibold text-gray-800 pb-2">
                Total Paid Amount
              </p>
              <p className="">${auth.user.teacher?.totalPaidAmount}</p>
            </div>
          </Card>
          <Card className="p-5 w-full">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800 pb-2">Pending Amount</p>
              <p className="">${auth?.user?.teacher?.pendingAmount}</p>
            </div>
          </Card>
          <Card className="p-5 w-full">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800 pb-2">Payment Method</p>
              <IconButton onClick={() => handleOpen("payment")}>
                <Create />
              </IconButton>
            </div>
            {auth?.user?.teacher?.paymentMethod ? (
              <div>
                <p className="font-semibold text-gray-900 mb-2">
                  {auth?.user?.teacher?.paymentMethod}
                </p>
                {auth?.user?.teacher?.paymentMethod === "WESTERN_UNION" ? (
                  <div className="flex justify-between">
                    <p>Full Name</p>
                    <p>{auth?.user?.teacher?.westernUnionName}</p>
                  </div>
                ) : (
                  <div className="space-y-2 ">
                    <div className="flex justify-between">
                      <p>Account No</p>
                      <p>{auth?.user?.teacher?.accountNo}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Ifc Code</p>
                      <p>{auth?.user?.teacher?.ifcCode}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p className="py-5 text-lg font-serif">
                  no payment method selected...
                </p>
              </div>
            )}
          </Card>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {updateForm === "subject" ? (
            <UpdateSubjectForm handleClose={handleClose} />
          ) : updateForm === "grad" ? (
            <UpdateGradForm handleClose={handleClose} />
          ) : updateForm === "payment" ? (
            <UpdatePaymentMethodForm handleClose={handleClose} />
          ) : updateForm === "persionalInfo" ? (
            <UpdatePersionalInfoForm handleClose={handleClose} />
          ) : (
            <UpdateAvailability handleClose={handleClose} />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default TeacherDashboard;
