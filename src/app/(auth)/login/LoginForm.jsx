import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import {
  isRequired,
  isEmail,
  isvalidPassword,
  isStrongPassword,
} from "@/app/validators";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Google } from "@mui/icons-material";
import TextInput from "@/app/components/forms/TextInput";
import { useRouter } from "next/navigation";
import api from "@/app/config/api";
import RenderCircularProgress from "@/app/components/RenderCircularProgress";
import ErrorAlert from "@/app/components/AlertError";
import sha256 from "crypto-js/sha256";
import { useDispatch } from "react-redux";
import { hasLogin } from "@/app/store/authSlice";
import ModalRegister from "../register/modalRegister";
import Register from "../register/page";

const LoginForm = ({ open, handleClose }) => {
  const [userRole, setUserRole] = useState("student");
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const toggleRole = (role) => {
    setUserRole(role);
  };
  const dispatch = useDispatch();
  // async function postJSON(data, userRole) {
  //   try {
  //     const response = await fetch(`https://edtech.ilbc.edu.mm/api/${userRole}/login`, {
  //       method: "POST", // or 'PUT'
  //       //mode: 'cors',
  //       headers: {
  //         "Content-Type": "application/json",
  //         // 'Access-Control-Allow-Origin': '*'
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     //  console.log("vite-response", response)
  //     const result = await response.json();
  //     console.log("Success:", result);
  //     if(result.status == 200){
  //       push("/profile")
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  const toggleDialog = () => {
    handleClose(true);
    setShowRegisterDialog(true);
  }

  return (
    <>{
      !showRegisterDialog?
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        // fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "25px",
            background: "#217FCE",
            //width: "480px",
          },
        }}
      >
        <Formik
          initialValues={{ phone_number: "", password: "" }}
          validate={(values) => {
            const errors = {};
            const number = /[0-9]/;
            if (!values.password) {
              errors.password = "Password is required.";
            } else if (values.password.length < 8) {
              errors.password =
                "Password must have a minimum length of 8 characters.";
            } else if (!number.test(values.password)) {
              errors.password = "password must contain at least one number";
            }
            return errors;
          }}
          onSubmit={(values) => {
            // console.log({ role: userRole, ...values });
            setLoading(true);
            let formdata = new FormData();
            formdata.append("phone_number", values.phone_number);
            formdata.append("password", values.password);
            // formdata.append("role", userRole);
            try {
              api.post(`/${userRole}/login`, formdata).then((res) => {
                console.log("=>",res)
                if (session) {
                  push(`/profile/teacher`);
                } else if (res?.data?.status == 200) {
                  setLoading(false);
                  dispatch(hasLogin(res.data));
                  push(`/profile/${userRole}`);
                  // push({
                  //   pathname: '/profile',
                  //   query: {name: userRole}
                  // })
                  handleClose(false);
                } else {
                  if (res) {
                    setError(res.error);
                  } else {
                    setError("API link not found");
                  }
                  setLoading(false);
                }
              });
              //postJSON(values, userRole)
            } catch (error) {
              setLoading(false);
              setError(error.message);
            }
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                <Stack gap="18px" paddingX="106px" bgcolor="#217FCE">
                  <DialogTitle
                    // textAlign="center"
                    // variant="h4"
                    // sx={{ color: "white", mb: 2 }}
                    fontSize="40px"
                    fontWeight={600}
                    color="#FFF"
                    textAlign="center"
                  >
                    Login
                  </DialogTitle>
                  <Box
                    display="flex"
                    flexDirection="row"
                    // gap={2}
                    bgcolor="#62A8E2"
                    border="1px solid #FFF"
                    borderRadius="30px"
                    position="relative"
                    width="267px"
                    height={43}
                    mx="auto"
                    justifyContent="space-between"
                  >
                    <Box
                      bgcolor="transparent"
                      onClick={() => toggleRole("student")}
                      px={2}
                      py={1}
                      width="110px"
                      component={motion.div}
                      sx={{
                        bgcolor: userRole === "student" && "#FFF",
                        borderRadius: "30px",
                        color: userRole === "student" ? "#217FCE" : "#FFF",
                        margin: 0.5,
                        cursor: "pointer",
                        transition: ".2s all ease-in-out ",
                        textAlign: "center",
                        fontSize: 14,
                      }}
                    >
                      Student
                    </Box>
                    <Box
                      bgcolor="transparent"
                      width="110px"
                      onClick={() => toggleRole("teacher")}
                      px={2}
                      py={1}
                      component={motion.div}
                      sx={{
                        bgcolor: userRole === "teacher" && "#FFF",
                        borderRadius: "25px",
                        color: userRole === "teacher" ? "#217FCE" : "#FFF",
                        margin: 0.5,
                        cursor: "pointer",
                        transition: ".2s all ease-in-out",
                        textAlign: "center",
                        fontSize: 14,
                      }}
                    >
                      Teacher
                    </Box>
                  </Box>
                  {userRole == "teacher" && (
                    <Box sx={{ width: "100%", pb: 4, pt: 4 }}>
                      <Button
                        startIcon={<Google />}
                        sx={{
                          bgcolor: "#62A8E2",
                          color: "white",
                          borderRadius: "25px",
                          height: "44px",
                          width: "100%",
                          border: "1px solid white",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          signIn(
                            "google",
                            {
                              callbackUrl: `/profile/teacher`,
                              //callbackUrl: `/profile`
                            },
                            // {
                            //   prompt: "login",
                            //   scope:
                            //     "openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/business.manage",
                            // }
                          );
                        }}
                      >
                        Login With Google
                      </Button>

                      {/* <Typography
                        textAlign="center"
                        mt={1}
                        sx={{ color: "white" }}
                      >
                        Or
                      </Typography> */}
                    </Box>
                  )}
                  {userRole == "student" &&
                    <>
                      <Field
                        type="number"
                        name="phone_number"
                        placeholder="Enter your phone number"
                        component={TextInput}
                        validate={isRequired}
                        {...formikProps}
                      />
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        component={TextInput}
                        validate={isRequired}
                        {...formikProps}
                      />
                    </>
                  }
                  {error ? <ErrorAlert>{error}</ErrorAlert> : ""}
                  <Button
                    type="submit"
                    sx={{
                      width: "123px",
                      height: "44px",
                      borderRadius: "25px",
                      bgcolor: "#62A8E2",
                      color: "white",
                      border: "1px solid white",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    {loading ? <RenderCircularProgress size="1.5rem" /> : "Login"}
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
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
            Create an Account
          </Button>
        </Box>
      </Dialog>
      :     
      <ModalRegister  open={showRegisterDialog} handleClose={setShowRegisterDialog} /> }
    </>
  );
};
export default LoginForm;
