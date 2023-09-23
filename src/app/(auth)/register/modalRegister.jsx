"use client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import UserRoleOption from "@/app/components/forms/UserRoleOption";
import StudentRegForm from "@/app/(auth)/register/StudentRegForm";
import TeacherRegForm from "@/app/(auth)/register/TeacherRegForm";
import LoginForm from "../login/LoginForm";
import moment from "moment";
import api from "@/app/config/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { hasLogin } from "@/app/store/authSlice";
import { useSelector } from "react-redux";

const ModalRegister = ({ open, handleClose }) => {
  const [regType, setRegType] = useState("student");
  const toggleRegType = (value) => setRegType(value);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const {push} = useRouter();
  const dispatch = useDispatch();
  const [registerProgressId, setRegisterProgressId] = useState("");

  const toggleDialog = () => {
    handleClose((prev) => !prev)
    setShowLoginDialog((prev) => !prev)
  };

  useEffect(() => {
    setRegisterProgressId(localStorage.getItem("userRegisteringId"))
  })

  const handleSubmit = (values) => {
    setLoading(true);
    //register api call here
    let formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("dob", moment(values.dob).format('YYYY-MM-DD'));
    formdata.append("password", values.password);
    formdata.append("password_confirmation", values.password_confirmation);
    formdata.append("gender", values.gender);
    formdata.append("region", values.region);
    formdata.append("address", values.address);
    try {
      api.post(`/user/create/${registerProgressId}`, formdata).then(res => {
        // console.log("user cretae res=>", res);        
        if(res.status == 201){
          setLoading(false);
          // push(`/student/profile`);
          handleClose(true);
          dispatch(hasLogin(res.data))
          push(`/products`);
        }
      })
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      {!showLoginDialog?
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "30px",
            background: "#217FCE",
            // position: "relative",
            // width: "560.539px",
            // height: "508.901px",
          },
        }}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-description"
          fontSize="40px"
          fontWeight={600}
          color="#FFF"
          textAlign="center"
        >
          Sign Up
        </DialogTitle>

        {/* <DialogContent
          sx={{
            overflow: "hidden",
            display: "flex",
            position: "relative",
            flexDirection: "column",
            gap: 1,
            px: 4,
          }}
        >
          <Grid container> */}
            {/* <Grid
            item
            justifyContent="center"
            alignItems="center"
            display="flex"
            xs={12}
          >
            <UserRoleOption regType={regType} toggler={toggleRegType} />
          </Grid> */}
            {/* {regType === "student" ?  */}
            <StudentRegForm handleSubmit={handleSubmit} loading={loading}/>
            {/* : <TeacherRegForm /> */}
          {/* </Grid>
        </DialogContent> */}

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={55}
          bgcolor="white"
          onClick={toggleDialog}
        >
          <Button
            variant="text"
            sx={{
              textDecoration: "underline",
              textTransform: "initial",
              fontSize: "13px",
              color: "#217FCE",
            }}
          >
            Already have an account?
          </Button>
        </Box>        
      </Dialog>   
      :<LoginForm open={showLoginDialog} handleClose={setShowLoginDialog} />}   
    </>
  );
};

export default ModalRegister;
