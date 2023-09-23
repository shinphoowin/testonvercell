import React from "react";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import RenderPhoneInput from "@/app/components/forms/phoneInputCustomSelect/RenderPhoneInput";
import { isRequired } from "@/app/validators";
import { Box } from "@mui/material";
import { Field, Formik, Form } from "formik";
import api from "@/app/config/api";
import RenderCircularProgress from "@/app/components/RenderCircularProgress";
import { useDispatch } from "react-redux";

export default function FormGetAuthCode({
  loading,
  setLoading,
  setSentOTP,
  setError,
  setOpenSnakBar,
}) {
  const dispatch = useDispatch();
  return (
    <Box alignItems="center" justifyContent="center">
      <Formik
        initialValues={{ phone_no: "" }}
        //validationSchema={phoneSchema}
        onSubmit={async ({ phone_no }) => {
          let intlPhoneNo = "+95";
          intlPhoneNo += phone_no;
          setLoading(true);
          // return;
          if (intlPhoneNo.slice(0, 4) !== "+959" || intlPhoneNo.length !== 13) {
            setError("Phone number is not valid");
            setOpenSnakBar(true);
            setLoading(false);
          } else {
            let formdata = new FormData();
              formdata.append("phone_number", intlPhoneNo);
            try {             
              api.post(`/phone/register`, formdata).then(res => {
                // console.log("auth res=>", res);
                if(res.status == 200){
                  setSentOTP(true);
                  setLoading(false);
                  setOpenSnakBar(false);
                  localStorage.setItem("userRegisteringId", res.user_id);
                }else if(res.status == 422){
                  setLoading(false);
                  setOpenSnakBar(true);
                  setError("Phone number is already taken.")
                }
              });
            } catch (error) {
              //console.log(error.message);
              setError(error.message);
              setLoading(false);
              setOpenSnakBar(true);
            }
          }
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <Box display="flex" gap={3}>
                <Box
                  m="auto"
                  sx={{
                    margin: "auto",
                    background: "#42AAFF",
                    padding: "0px",
                    borderRadius: "30px",
                    width: "350px",
                    height: "48px",
                  }}
                >
                  <Field
                    name="phone_no"
                    validate={isRequired}
                    height="48px"
                    placeholder="Enter Your Phone Number"
                    value={formikProps.values.phone_no}
                    onChange={formikProps.handleChange("phone_no")}
                    //component={PhoneInputMultiCountry}
                    component={RenderPhoneInput}
                    {...formikProps}
                  />
                </Box>
                <Box m="auto">
                  <ButtonPrimary
                    type="submit"
                    disabled={formikProps.isSubmitting}
                    size="large"
                    textColor="#fff"
                    width="142px"
                    height="48px"
                    lineHeight="48px"
                  >
                    {loading ? <RenderCircularProgress size="1.5rem"/> : "Get Started"}
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
