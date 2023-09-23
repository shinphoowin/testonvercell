import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import MyClassHook from "./MyClassHook";
import { Field, Form, Formik } from "formik";
import DateTimePickerField from "@/app/components/forms/DateTimePickerField";
import { dummyTable } from "@/app/utils/constant";
import { CSVLink } from "react-csv";
import SettingButton from "../SettingButton";
import CreateMeetingForm from "@/app/components/CreateMeetingForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignedCourses } from "@/app/store/assignedClassesSlice";
import CoursesOrClasses from "@/app/profile/teacher/CoursesOClasses";
import { useSession } from "next-auth/react";

const MyClasses = ({assignedClasses=[]}) => {
  // console.log(assignedClasses)
  const {
    openCreateMeetingDialog,
    //action
    setOpenCreateMeetingDialog,
  } = MyClassHook();
  return (
    <>
      <Stack direction="column">
        <Typography fontSize="20px" fontWeight="700">
          Your Classes
        </Typography>
        <Stack
          direction="row"
          gap={4}
          justifyContent="flex-end"
          alignItems="center"
        >
          {/* <Button>CSV Download</Button> */}
          {/* <SettingButton
            label="Create Metting"
            onClick={() => setOpenCreateMeetingDialog(true)}
          /> */}           
        </Stack>
        <Divider sx={{ borderColor: "#c8c8c8", my: 3 }} />
        <Stack m={2}>
          <label>assigned courses/classes to teacher</label>
          {
            assignedClasses?.map(assignedClass => <CoursesOrClasses assignedClass={assignedClass} key={assignedClass.id} teacherId={assignedClasses?.teacher?.id} />)
          }
        </Stack>

        <Stack>
          <CSVLink data={dummyTable} filename={"student-report.csv"}>
            Export as CSV
          </CSVLink>
        </Stack>
      </Stack>
    </>
  );
};

export default MyClasses;
