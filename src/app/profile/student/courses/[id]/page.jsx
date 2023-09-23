'use client'
import { fetchCourse } from "@/app/store/courseSlice";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CourseEnroll from "./CourseEnroll";
import SectionButton from "./SectionButton";
import RenderCircularProgress from "@/app/components/RenderCircularProgress";
import AlertError from "@/app/components/AlertError";

function CourseDetail({ params }) {
  const { loading, haveData, haveError, courseDetail, errMsg } = useSelector(state => state.courseData, shallowEqual);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourse(params.id))
  }, []);
  // console.log(loading, haveData, haveError, courseDetail)
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1280px",
        pt: 8, pb: 8
      }}
    >
      {
        loading ? <RenderCircularProgress /> :
          haveError ? <AlertError>{errMsg}</AlertError> :
            haveData &&
            <>
              <Box sx={{
                width: "665px",
                mt: 5,
                p: 3,
                borderRadius: "25px",
                background: "#fff",
                border: "2px solid #eee",
              }}>
                <Typography sx={{ mb: 3, fontSize: 25, fontWeight: 700 }}>
                  {courseDetail.course_name} {courseDetail.id}
                </Typography>
                <Typography component="p" sx={{ mb: 3 }} fontWeight={400}>
                  {courseDetail.description}
                  <em>{courseDetail.period} - {courseDetail.price}</em>
                </Typography>
                <Typography fontWeight={700} mt={2}>
                  Choose the section you like and enroll with any available teacher.
                </Typography>
                {
                  courseDetail?.sections?.map(section => <SectionButton section={section} key={section.id} />)
                }
              </Box>
              <CourseEnroll courseId={courseDetail.id} />
            </>
      }
    </Container>
  )
}
export default CourseDetail;