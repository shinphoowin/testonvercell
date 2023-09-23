import { Grid, Typography } from "@mui/material";
import React from "react";
import ItemAsGridChild from "../components/ItemAsGridChild";
import TransitionBox from "../components/home/TransitionBox";
import CardMainProduct from "../components/CardMainProducts";
import LabelMainProducts from "../components/LabelMainProducts";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MainProducts() {
  const { push } = useRouter();
  return (
    <Grid
      container
      sx={{
        paddingTop: "5rem",
        paddingBottom: "8rem",
      }}
    >
      <Grid item xs={12}>
        <ItemAsGridChild>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", fontFamily: "Raleway" }}
            mb={4}
          >
            Main Products
          </Typography>
        </ItemAsGridChild>
      </Grid>
      <Grid container item spacing={7}>
        <Grid item sm={6} lg={4} md={6}>
          <TransitionBox iy="5rem" ay={0} ds={0.5}>
            <ItemAsGridChild onClick={() => push("/products/face-to-face")}>
              <CardMainProduct
                imgUrl={"/images/OtoM.png"}
                bgGradient="border-radius: 25px;background: linear-gradient(141deg, #D2C8FF 0%, rgba(255, 188, 232, 0.00) 100%);"
              />
              <LabelMainProducts>Face-to-Face</LabelMainProducts>
            </ItemAsGridChild>
          </TransitionBox>
        </Grid>
        <Grid item sm={6} md={6} lg={4} p={2}>
          <TransitionBox iy="5rem" ay={0} ds={0.8}>
            <ItemAsGridChild onClick={() => push("http://quicklearn.ilbc.edu.mm")}>
              <CardMainProduct
                imgUrl={"/images/quicklearn.png"}
                bgGradient="border-radius: 25px;25px;background: linear-gradient(141deg, #D0F3F7 0%, rgba(182, 227, 248, 0.00) 100%);"
              />
              <LabelMainProducts>
                Quick Learn
              </LabelMainProducts>
            </ItemAsGridChild>
          </TransitionBox>
        </Grid>
        <Grid item sm={6} md={6} lg={4} p={2}>
          <TransitionBox iy="5rem" ay={0} ds={0.95}>
            <ItemAsGridChild onClick={() => push("/products/mooc")}>
              <CardMainProduct
                imgUrl={"/images/ZayBanGyi.png"}
                bgGradient="border-radius: 25px;background: linear-gradient(141deg, #FFE6C8 0%, rgba(255, 252, 188, 0.00) 100%);"
              />
              <LabelMainProducts>
              Premium English Language Courses
              </LabelMainProducts>
            </ItemAsGridChild>
          </TransitionBox>
        </Grid>
      </Grid>
    </Grid>
  );
}
