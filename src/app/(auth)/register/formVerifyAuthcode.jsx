import React, { useState, useEffect } from "react";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import RenderCircularProgress from "@/app/components/RenderCircularProgress";
import RenderOTPInput from "@/app/components/forms/otpInput";
import { isRequired } from "@/app/validators";
import { Alert, Box, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { firebaseError } from "@/app/custom";
import api from "@/app/config/api";
import { useDispatch } from "react-redux";

export default function FormVerifyOTP({
  error,
  setError,
  setOpenSnakBar,
  handleRegModalOpen,
  insertedUsrId,
}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const [registerProgressId, setRegisterProgressId] = useState("");

  useEffect(() => {
    setRegisterProgressId(localStorage.getItem("userRegisteringId"))
  })

  return (
    <Box alignItems="center" justifyContent="center">
      <Formik
        initialValues={{ verification_code: "" }}
        onSubmit={async ({ verification_code }) => {
          setLoading(true);
          let formdata = new FormData();
          formdata.append("verification_code", verification_code);
          try {
            await api
              .post(`/otp/verify/${registerProgressId}`, formdata)
              .then((res) => {
                // console.log("verify res=>", res);
                if (res.status !== 200) {
                  setOpenSnakBar(true);
                  setLoading(false);
                  setError(result.error);
                  handleRegModalOpen(false);
                } else {
                  setLoading(false);
                  handleRegModalOpen(true);
                  setOpenSnakBar(false);
                }
              });
          } catch (error) {
            console.log("error section hit", error.message);
            setError(error.message);
            setLoading(false);
            setOpenSnakBar(true);
            handleRegModalOpen(false);
          }
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <Box display="flex" width={530}>
                <Box
                  m="auto"
                  sx={{
                    margin: "auto",
                    background: "#fff",
                    padding: "2px",
                    borderRadius: "30px",
                    width: "350px",
                    height: "48px",
                  }}
                >
                  <Field
                    name="verification_code"
                    validate={isRequired}
                    height="48px"
                    value={formikProps.values.verification_code}
                    onChange={formikProps.handleChange("verification_code")}
                    onBlur={formikProps.handleBlur("verification_code")}
                    component={RenderOTPInput}
                    {...formikProps}
                  />
                </Box>
                <Box m="auto">
                  <ButtonPrimary
                    type="submit"
                    disabled={error == "Token is expired"}
                    size="large"
                    textColor="#fff"
                    width="142px"
                    height="48px"
                    lineHeight="48px"
                  >
                    {loading ? (
                      <RenderCircularProgress size="1.5rem" />
                    ) : (
                      `Verify`
                    )}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
