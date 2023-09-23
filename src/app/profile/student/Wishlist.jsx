import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import RenderCircularProgress from "../../components/RenderCircularProgress";
import CoursesOrClasses from "@/app/profile/student/CoursesOClasses";
import { fetchCourses } from "@/app/store/coursesSlice";
import { hasLogin } from "@/app/store/authSlice";

const Wishlist = () => {
  const { loading, haveData, haveError, courses } = useSelector((state) => ({
    ...state.coursesData,
  }), shallowEqual);
  const { hastoken } = useSelector((state) => ({...state.authData }), shallowEqual);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hasLogin());
    if(hastoken){
      dispatch(fetchCourses(hastoken));
    }    
  }, []);

  return (
    <Stack gap={3}>
      <label>total courses: {courses?.length}</label> 
      {
        loading ? (
          <RenderCircularProgress />
        ) : haveError ? (
          <Alert severity="error">Api cannot return data</Alert>
        ) : haveData && courses.length == 0 ? (
          <Alert severity="success">no data yet</Alert>
        ) : (haveData &&
          courses.map((course) => {
            return (
              <CoursesOrClasses course={course} key={course.id}/>
            );
          })
        )}
    </Stack>
  );
};
export default Wishlist;
