'use client'
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { isRequired } from "@/app/validators";
import DateTimePickerField from "./forms/DateTimePickerField";
import api from "@/app/config/api";
import AlertError from "./AlertError";
import AlertSuccess from "./AlertSuccess";
import RenderCircularProgress from "./RenderCircularProgress";
import { useDispatch } from "react-redux";
import { fetchAssignedCourses } from "../store/assignedClassesSlice";
import moment from "moment";

const CreateMeetingForm = ({ open, setOpen, tokenObj, access_token }) => {
  let coursess = [
    { "course_name": "test" },
    { "course_name": "test2" }
  ]
  //console.log(tokenObj,access_token)
  const [errormsg, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  async function createMeeting(formdata) {
    setLoading(true);
    try {
      const response = await fetch("https://edtech.ilbc.edu.mm/api/meeting/create", {
        method: "POST", // or 'PUT'
        headers: {
          "Accept": "application/json",
          "Authorization": `${access_token}`
        },
        body: formdata,
      });
      const result = await response.json();
      console.log("===============>>", result)
      if (result.status == 200) {
        setLoading(false);
        setSuccessMessage(result.meetLink);
        dispatch(fetchAssignedCourses(tokenObj))
        setOpen(false)
      }else{
        setLoading(false);
        setErrorMessage(result.message)
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setErrorMessage(error.message);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      // fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "25px",
          //background: "#217FCE",
          width: "600px",
          pb: 8
        },
      }}
    >
      <Formik
        initialValues={{ start_time: "", end_time: "" }}
        onSubmit={(values) => {
          // same shape as initial values
          //console.log(moment(values.start_time).toISOString().slice(0, 16));return
          // let startTime = moment(values.startTime).toISOString();
          // let endTime = moment(values.endTime).toISOString();
          // console.log(moment(startTime).isBefore(moment(endTime),'day'))
          // console.log("===", startTime, endTime)
          // console.log(moment(endTime).isAfter(startTime));
          // if(1==1){
          //   setErrorMessage("End Time should not smaller than Start Time")
          // }
          let formdata = new FormData();
          formdata.append("start_time", values.start_time.toISOString().slice(0, 16));//"10:00:00"
          formdata.append("end_time", values.end_time.toISOString().slice(0, 16));//"11:00:00"
          // console.log(values);
          // console.log(moment(values.start_time).toISOString().slice(0, 16), moment(values.end_time).toISOString().slice(0, 16))
          // return;
          try {
            // api.post(`/meeting/create/${values.course_id}`, formdata, `${data?.accessToken}`).then(res => {
            //   if(res.status == 200){
            //     console.log("meeting created")
            //   }else{
            //     setErrorMessage(res.message)
            //   }
            // })
            createMeeting(formdata)
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <Stack gap="18px" paddingX="106px">
                <DialogTitle
                  // sx={{ color: "white", mb: 2 }}
                  fontSize="40px"
                  fontWeight={600}
                  textAlign="center"
                >
                  Create Meeting
                </DialogTitle>
                <Field
                  name="start_time"
                  component={DateTimePickerField}
                  validate={isRequired}
                  value={formikProps.values.start_time}
                  onChange={(newValue) => {
                    formikProps.setFieldValue("start_time", newValue, true);
                  }}
                  {...formikProps}
                />
                <Field
                  name="end_time"
                  component={DateTimePickerField}
                  validate={isRequired}
                  value={formikProps.values.end_time}
                  onChange={(newValue) => {
                    formikProps.setFieldValue("end_time", newValue, true);
                  }}
                  {...formikProps}
                />
                {errormsg && <AlertError>{errormsg}</AlertError>}
                {successMessage && <AlertSuccess>{successMessage}</AlertSuccess>}
                <Button
                  type="submit"
                  sx={{ py: 1, borderRadius: "15px" }}
                  variant="outlined"
                  color="inherit"
                >
                  {loading ? <RenderCircularProgress size="1.5rem" /> : "Crete Meeting"}
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
export default CreateMeetingForm;