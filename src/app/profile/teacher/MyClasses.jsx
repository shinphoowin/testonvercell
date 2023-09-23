import {
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { dummyTable } from "@/app/utils/constant";
import { CSVLink } from "react-csv";
import CoursesOrClasses from "@/app/profile/teacher/CoursesOClasses";
import RenderCircularProgress from "@/app/components/RenderCircularProgress";
import AlertError from "@/app/components/AlertError";
import AlertSuccess from "@/app/components/AlertSuccess";

const MyClasses = ({ assignedClasses, loading, haveData, haveError, errorMsg }) => {
  //console.log(assignedClasses)
  return (
    <Stack direction="column">
      <Typography fontSize="20px" fontWeight="700" sx={{ml: 2}}>
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
        {loading ? <RenderCircularProgress size="1.25rem" />
          : haveError ? <AlertError>{errorMsg}</AlertError>
            : haveData && assignedClasses?.courses?.length == 0 ? <AlertSuccess>"There is no data yet."</AlertSuccess> :
              haveData &&
              assignedClasses?.courses?.map(assignedClass => <CoursesOrClasses assignedClass={assignedClass} key={assignedClass.id} teacherId={assignedClasses?.teacher?.id} />)
        }
      </Stack>
      {/*<Stack>
        <CSVLink data={dummyTable} filename={"student-report.csv"}>
          Export as CSV
        </CSVLink>
      </Stack>*/}
    </Stack>
  );
};
export default MyClasses;
