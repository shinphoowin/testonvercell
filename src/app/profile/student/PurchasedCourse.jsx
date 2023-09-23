import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import RenderCircularProgress from "../../components/RenderCircularProgress";
import { fetchmyPurchasedCourses } from "@/app/store/myPurchasedCoursesSlice";
import { hasLogin } from "@/app/store/authSlice";
// import { getToken } from "next-auth/jwt";

const PurchasedCourse = () => {
  const { push } = useRouter();
  const [showCreateMeetingDialog, setShowCreateMeetingDialog] =
    React.useState(false);
  const { loading, haveData, haveError, myPurchasedCourses, errMsg } = useSelector((state) => ({
    ...state.myPurchasedCoursesData,
  }), shallowEqual);
  const { userId } = useSelector((state) => ({
    ...state.authData,
  }), shallowEqual);
  const dispatch = useDispatch();
  // const secret = process.env.SECRET;
  // const gToken = getToken({ req, secret });

  useEffect(() => {
    dispatch(hasLogin())
    dispatch(fetchmyPurchasedCourses(userId));
  }, []);

  const handlePushJoinUi = (purchasedcourseId) => {
    return push(`/profile/student/purchased/join/${purchasedcourseId}`);
  };
  return (
    <Stack gap={3}>
      {
        loading ? (
          <RenderCircularProgress />
        ) : haveError ? (
          <Alert severity="error">{errMsg}</Alert>
        ) : haveData && myPurchasedCourses.length == 0 ? (
          <Alert severity="success">no data yet</Alert>
        ) :
          (haveData &&
            myPurchasedCourses.map((course) => {
              return (
                <Stack
                  key={course.id}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={3}
                  sx={{
                    borderRadius: "25px",
                    border: "1px solid #eee",
                    boxShadow: "3px 3px 5px #eee",
                    padding: 3,
                    "&:hover": {
                      boxShadow: "3px 3px 7px #ddd",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Box
                      sx={{

                        width: 85,
                        height: 70,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        alt="next iamge"
                        src="/images/logo-2.jpg"
                        width={85}
                        height={70}
                        placeholder="student logo 2"
                        blurDataURL="/images/logo-2.jpg"
                      />
                    </Box>
                    <Box>
                      <Typography fontSize="18px" fontWeight="bold">
                        {course.course_name}-{course.id}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {course?.meetings[0]?.meet_link}
                      </Typography>
                      <Typography display={"flex"} alignItems="center" gap={1}>
                        Purchased from teacher - {course?.meetings[0]?.teacher_id}
                      </Typography>
                      <Box display={"flex"} gap={3} mt={2}>
                        <Typography display={"flex"} alignItems="center" gap={1}>
                          <AutoStoriesIcon /> 25+ lessons
                        </Typography>
                        <Typography display={"flex"} alignItems="center" gap={1}>
                          <WatchLaterIcon /> {course.period}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {/* <Button
                    sx={{ px: 4, py: 2, borderRadius: "15px" }}
                    variant="outlined"
                    color="inherit"
                    target="_blank"
                    href={course?.meetings[0]?.meet_link}
                    disabled={!course?.meetings[0]?.meet_link ? true : false}
                  >
                    Join
                  </Button> */}
                  <Button
                    sx={{ px: 4, py: 2, borderRadius: "15px" }}
                    variant="outlined"
                    color="inherit"
                    target="_blank"
                    //href={"/purchased/join"}
                    onClick={() => handlePushJoinUi(course.id)}
                    disabled={!course?.meetings[0]?.meet_link ? true : false}
                  >
                    Join
                  </Button>
                </Stack>
              );
            })
          )}
    </Stack>
  );
};

export default PurchasedCourse;
