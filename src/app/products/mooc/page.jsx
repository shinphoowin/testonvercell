"use client";
import styled from "@emotion/styled";
import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import CardMainProduct from "../../components/CardMainProducts";
import LabelMainProducts from "../../components/LabelMainProducts";
import { useRouter } from "next/navigation";

export default function ZayBanGyi() {
  const {push} = useRouter();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    padding: "2",
    textAlign: "center",
    boxShadow: "none",
    fontFamily: "Raleway",
  }));
  return (
    <React.Fragment>
      <Grid container sx={{ paddingTop: "81px", paddingBottom: "130px" }}>
        <Grid item xs={12}>
          <Item>
            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: "bold", fontFamily: "Raleway" }}
            >
              MOOC Coming soon!
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
