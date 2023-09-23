"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import FaceToFaceCard from "../FaceToFaceCard";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import RenderCircularProgress from "@/app/components/RenderCircularProgress";
import AlertError from "@/app/components/AlertError";
import AlertSuccess from "@/app/components/AlertSuccess";
import { fetchoToCourses } from "@/app/store/oTocouresSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  //padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  boxShadow: "none!important",
}));


const page = () => {
  const {loading, haveData, haveError,  otocourses, errMsg} = useSelector((state) => ({...state.otocoursesData}), shallowEqual);
  const [customarr, setCustomArr] = useState([
    { id: 1, isFavourite: false },
    { id: 2, isFavourite: false },
    { id: 3, isFavourite: false },
    { id: 4, isFavourite: false }
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchoToCourses())
  },[]);
  // console.log(otocourses);
  const handleSelectFav = (idx) => {
    let updatedState = customarr.map(obj => {
      if (obj.id === idx) {
        return {
          ...obj,
          isFavourite: !obj.isFavourite
        }
      }
      return obj;
    })
    setCustomArr(updatedState)
  }
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1280px",
        pt: 8, pb: 8
      }}
    >
      <Grid container spacing={2} mb={8}>
        {
          loading ? <RenderCircularProgress/> :
          haveError ? <AlertError>{errMsg}</AlertError> :
          haveData && otocourses.length == 0 ? <AlertSuccess>There is no data yet.</AlertSuccess> :
          haveData && otocourses.map(obj =>
          <Grid item xs={6} lg={3} md={4} key={obj.id}>
            <Item>
              <FaceToFaceCard onClick={() => handleSelectFav(obj.id)} obj={obj} />
            </Item>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default page;
