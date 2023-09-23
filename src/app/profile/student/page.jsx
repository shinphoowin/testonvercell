"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
// import WatchLaterIcon from "@mui/icons-material/WatchLater";
import FreeCourse from "@/app/profile/student/FreeCourse";
import PurchasedCourse from "@/app/profile/student/PurchasedCourse";
import Wishlist from "@/app/profile/student/Wishlist";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RenderCircularProgress from "../../components/RenderCircularProgress";
import { ClassRoomShare } from "../../components/ClassRoomShare";
import { shallowEqual, useSelector } from "react-redux";

const courseTypes = [
  { id: 1, name: "Free Courses" },
  { id: 2, name: "Purchased Courses" },
  { id: 880, name: "Wishlists" },
];

export default function StudentProfile({ params }) {
  const [course, setCourse] = useState(2);
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const [token, setToken] = useState({});
  const{name, email, userRole, userId} = useSelector(state => state.authData, shallowEqual)

  useEffect(() => {
    setToken(window.localStorage.getItem('authTokenOwn'));
  }, [])
  //console.log("nextAuth google session data",session)
  //console.log(token)
  const stepTab = (step) => {
    switch (step) {
      case 1:
        return <FreeCourse />;
      case 2:
        return <PurchasedCourse />;
      case 880:
        return <Wishlist />;
      default:
        return null;
    }
  };
  if (status === "loading") {
    return (
      <Box sx={{ background: "url(images/bgicon.png)", py: 5 }}>
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
    );
  }
  if (status !== "authenticated" && !token) {
    return (
      <Box sx={{ background: "url(images/bgicon.png)", py: 5 }}>
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
      sx={{
        backgroundImage: `url(${"/images/bgicon.png"})`,
        backgroundSize: "100%",
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1280px', pt: 4, pb: 8 }}>
        <Box
          sx={{
            border: "1px solid #eee",
            bgcolor: "white",
            borderRadius: "25px",
            p: 3,
            mt: 3,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Box
                sx={{
                  
                  width: 98,
                  height: 98,
                  overflow: "hidden",
                }}
              >
                <Image
                  alt="next iamge"
                  src="/images/logo-2.jpg"
                  width={95}
                  height={80}
                  placeholder="student logo 2"
                  blurDataURL="/images/logo-2.jpg"
                />
              </Box>
              <Box>
                <Typography fontSize="18px" fontWeight="bold">
                  Name: {name}
                </Typography>
                <Typography fontSize="16px">
                  Email: {email}
                </Typography>
                <Typography fontSize="14px">
                  Role : {userRole}
                </Typography>
                <Typography fontSize="14px">
                  UserId : {userId}
                </Typography>
              </Box>
            </Box>
            <Button
              sx={{
                padding: "11px 34px",
                borderRadius: 5,
                "&:hover": {
                  bgcolor: "#C8C8C8",
                  color: "white",
                },
                border: "1px solid #ccc",
              }}
              onClick={() => push("/profile/student/account-settings")}
            >
              Account setting
            </Button>
          </Stack>
          <Divider sx={{ mt: 2 }} />
          <Stack direction="row" gap={3}>
            {courseTypes.map((courseT) => {
              return (
                <Button
                  sx={{
                    p: 2,
                    fontWeight: course == courseT.id ? "bold" : "",
                    borderBottom: course == courseT.id ? "2px solid #333" : "",
                  }}
                  style={{ borderRadius: 0 }}
                  key={courseT.id}
                  color="inherit"
                  onClick={() => setCourse(courseT.id)}
                  disableRipple
                >
                  {courseT.name}
                </Button>
              );
            })}
          </Stack>
        </Box>
        <Box
          sx={{
            border: "1px solid #eee",
            borderRadius: "25px",
            p: 3,
            px: 10,
            mt: 3,
            bgcolor: "white",
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h5" sx={{ float: "left" }}>
              Classroom
            </Typography>

            <Box as="div">
              <ClassRoomShare />
            </Box>

            <Typography sx={{ textAlign: "right" }}>Assignment</Typography>
          </Box>

          <Stack mt={5}>{stepTab(course)}</Stack>
        </Box>
      </Container>
    </Box>
  );
}
