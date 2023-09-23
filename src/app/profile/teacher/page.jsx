"use client";
import {
  Container,
  Grid,
  Stack,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  accountSettings,
  mySubscriptions,
} from "@/app/utils/constant";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  EditProfile,
  Security,
  Notification,
  Wishlists,
  Courses,
} from "../../components/profile/setting";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchAssignedCourses } from "@/app/store/assignedClassesSlice";
import RenderCircularProgress from "@/app/components/RenderCircularProgress";
import AlertError from "@/app/components/AlertError";
import AlertSuccess from "@/app/components/AlertSuccess";
import CreateMeetingForm from "@/app/components/CreateMeetingForm";
import MyClasses from "./MyClasses";
import { ClassRoomShare } from "@/app/components/ClassRoomShare";

export default function TeacherProfile() {
  const [steps, setSteps] = useState(1);
  const router = useRouter();
  const [profileImg, setProfileImg] = useState("");
  const [openCreateMeetingDialog, setOpenCreateMeetingDialog] = useState(false);

  const { data: session, status } = useSession();
  // console.log(session)
  const { loading, haveData, haveError, assignedClasses, errorMsg } = useSelector((state) => ({
    ...state.assignedCourseOClassData
  }), shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    if (session) {
      const tokenObj = { userId: session?.userId, customToken: session?.customToken }
      dispatch(fetchAssignedCourses(tokenObj))
    }
  }, [session]);
  // console.log(">>",assignedClasses?.courses);
  const displayComponents = (step) => {
    switch (step) {
      case 1:
        return <MyClasses assignedClasses={assignedClasses} haveData={haveData} loading={loading} haveError={haveError} errorMsg={errorMsg} />;
      case 2:
        return <EditProfile />;
      case 3:
        return <Security />;
      case 4:
        return <Courses />;
      case 5:
        return <Notification />;
      case 6:
        return <Wishlists />;
      default:
        return null;
    }
  };

  if (status === 'loading') {
    <Box>
      <Container>
        <Box
          sx={{
            border: "1px solid #eee",
            bgcolor: "white",
            borderRadius: "25px",
            p: 3,
            mt: 3,
          }}
        >
          <RenderCircularProgress />
        </Box>
      </Container>
    </Box>
  }
  if (status !== "authenticated") {
    return (
      <Box 
      sx={{ backgroundImage: `url(${"/images/bgicon.png"})`, py: 5 }}
      >
        <Container>
          <Box
            sx={{
              border: "1px solid #eee",
              bgcolor: "white",
              borderRadius: "25px",
              p: 3,
              mt: 3,
            }}
          >
            you need to login to access this page
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      style={{
        backgroundImage: `url(${"/images/bgicon.png"})`,
        backgroundSize: "100%",
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1280px', pt: 4, pb: 8 }}>
        {/* <Box
          sx={{
            border: "1px solid #eee",
            bgcolor: "white",
            borderRadius: "25px",
            p: 3,
            mt: 3,
          }}
        > */}
        
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              display="flex"
              flexDirection="column"
              borderRadius={3}
              bgcolor="#FFF"
              overflow="hidden"
              position="relative"
              sx={{ boxShadow: 1, mx: "auto" }}
            >
              <Box bgcolor="#FCC" height="133px" width="100%"></Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height={160}
                mt={-10}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={profileImg}
                  sx={{ width: 140, height: 140, border: "4px solid #fff" }}
                />
              </Box>
              <Stack direction="column" textAlign="center" mb={2}>
                <Typography fontSize="20px" fontWeight="700">
                  {session?.user?.name}-{session?.user?.id}
                </Typography>
                <Typography fontSize="16px" fontWeight="400">
                  {session?.user?.email}
                </Typography>
                <Typography fontSize="16px" fontWeight="400">
                  Teacher id - {session?.userId}
                </Typography>
              </Stack>
            </Box>
          </Grid>
          {/* top 3 col verview section */}
          <Grid item xs={9}>
            <Box
              display="flex"
              flexDirection="column"
              padding={3}
              borderRadius={3}
              bgcolor="#FFF"
              sx={{ boxShadow: 1 }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  p={2}
                  flex={0.3}
                  border="1px solid #c8c8c8"
                  borderRadius="25px"
                >
                  <Typography fontSize="30px" fontWeight={500}>
                    4
                  </Typography>
                  <Typography fontSize="20px" fontWeight={800}>
                    Purchase All Course
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                      textAlign: "left",
                      textDecoration: "underline",
                      textTransform: "initial",
                      fontSize: "16px",
                      fontWeight: 400,
                      cursor: "pointer",
                      "& :hover": {
                        color: "dodgerblue",
                      },
                    }}
                  >
                    View All
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  p={2}
                  flex={0.3}
                  border="1px solid #c8c8c8"
                  borderRadius="25px"
                >
                  <Typography fontSize="30px" fontWeight={500}>
                    4
                  </Typography>
                  <Typography fontSize="20px" fontWeight={800}>
                    Purchase All Course
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                      textAlign: "left",
                      textDecoration: "underline",
                      textTransform: "initial",
                      fontSize: "16px",
                      fontWeight: 400,
                      cursor: "pointer",
                      "& :hover": {
                        color: "dodgerblue",
                      },
                    }}
                  >
                    View All
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  p={2}
                  flex={0.3}
                  border="1px solid #c8c8c8"
                  borderRadius="25px"
                >
                  <Typography fontSize="30px" fontWeight={500}>
                    4
                  </Typography>
                  <Typography fontSize="20px" fontWeight={800}>
                    Purchase All Course
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                      textAlign: "left",
                      textDecoration: "underline",
                      textTransform: "initial",
                      fontSize: "16px",
                      fontWeight: 400,
                      cursor: "pointer",
                      "& :hover": {
                        color: "dodgerblue",
                      },
                    }}
                  >
                    View All
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                flex={0.3}
                justifyContent="flex-start"
                alignItems="center"
                mt={3}
              >
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "initial",
                    color: "#454545",
                    padding: "11px 34px",
                    border: "1px solid #c8c8c8",
                    borderRadius: "41px",
                  }}
                  onClick={() => router.push("/profile/teacher")}
                >
                  Dashboard
                </Button>
              </Stack>
            </Box>
          </Grid>
          {/* #top 3 col verview section */}
          <Grid item xs={3}>
            <Box
              borderRadius={3}
              bgcolor="#FFF"
              sx={{ boxShadow: 1, height: "850px" }}
            >
              <Box p={2} mb={4}>
                <Typography
                  fontSize="21px"
                  ml={2}
                  fontWeight={700}
                  textAlign="left"
                >
                  Account Setting
                </Typography>
                <Divider sx={{ height: 0.5, borderColor: "#000", my: 2 }} />
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  gap={1}
                >
                  {accountSettings.map((accSet) => (
                    <Stack
                      sx={{
                        cursor: "pointer",
                        bgcolor: steps === accSet.id && "#F0F0F0",
                        borderRadius: "10px",
                        transition: "all .3s ease",
                        py: 1,
                        width: "100%",
                      }}
                      key={accSet.id}
                      component="div"
                      onClick={() => setSteps(accSet.id)}
                    >
                      <Stack direction="row" ml={2} gap={{ xs: 1, md: 2 }}>
                        {accSet.icon}
                        <Typography
                          fontSize="18px"
                          color={steps === accSet.id && "primary"}
                          fontWeight={400}
                          sx={{
                            "&:hover": {
                              color: "#c8c8c8",
                            },
                            transition: ".2s all ease-in",
                          }}
                        >
                          {accSet.title}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Box>
              <Box p={2} mb={4}>
                <Typography
                  fontSize="21px"
                  ml={2}
                  fontWeight={700}
                  textAlign="left"
                >
                  Subscription
                </Typography>
                <Divider sx={{ height: 0.5, borderColor: "#000", my: 2 }} />
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  gap={1}
                >
                  {mySubscriptions.map((accSub) => (
                    <Stack
                      sx={{
                        cursor: "pointer",
                        bgcolor: steps === accSub.id && "#F0F0F0",
                        borderRadius: "10px",
                        py: 1,
                        width: "100%",
                      }}
                      component="div"
                      key={accSub.id}
                      onClick={() => setSteps(accSub.id)}
                    >
                      <Stack direction="row" ml={2} gap={{ xs: 1, md: 2 }}>
                        {accSub.icon}
                        <Typography fontSize="18px" fontWeight={400}>
                          {accSub.title}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Box>
              <Box
                pb={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  sx={{
                    borderRadius: "40px",
                    padding: "11px 34px",
                    border: " 1px solid #C8C8C8",
                    textTransform: "initial",
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={9}>          
            <Box
              borderRadius={3}
              bgcolor="#FFF"
              overflow="hidden"
              sx={{ boxShadow: 1, height: "auto" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                {/* {session?.accessToken} - <hr/>{session?.refreshToken}
                <hr/>
                <h1>{assignedClasses?.courses?.length}</h1> */}
                </Grid>
                <Grid item xs={3}>
                  <Button
                    sx={{ px: 4, py: 2, borderRadius: "15px", width: '200px', m: 2 }}
                    variant="outlined"
                    color="inherit"
                    onClick={() => setOpenCreateMeetingDialog(true)}
                  >
                    Create Meeting
                  </Button>
                </Grid>
                <Grid item xs={1} sx={{mt: 2}}>
                {/* <Image
                  src="/images/classroom.png"
                  width={38}
                  height={32}
                  alt="classroom"
                /> */}
                <ClassRoomShare/>
                </Grid>
              </Grid>
              <Stack direction="column"> 
              {/* <Grid> */}
                {
                  session &&
                  <CreateMeetingForm
                    open={openCreateMeetingDialog}
                    setOpen={setOpenCreateMeetingDialog}
                    tokenObj={{ userId: session?.userId, customToken: session?.customToken }}
                    access_token={session?.accessToken}
                  />
                }
                
                {displayComponents(steps)}
                {/* </Grid> */}
              </Stack> 
            </Box>
          </Grid>
        </Grid>
      </Container >
    </Box >
  );
}
