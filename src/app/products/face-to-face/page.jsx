"use client";

import { Box, Grid, Typography } from "@mui/material";
import TransitionBox from "../../components/home/TransitionBox";
import CardsLikeProduct from "./CardsLikeProduct";

export const ProductsFacetoFace = [
  {
    id: 1,
    bgcolor: "linear-gradient(141deg, #CCFFC8 0%, rgba(250, 214, 214, 0.00) 100%)",
    hovercolor: "linear-gradient(141deg, #CCFFC8 0%, rgba(250, 214, 214, 0.8) 0%)",
    name: "One-to-One",
    image: "/images/OtoM.png",
    linkTo: "/face-to-face/one-to-one",
  },
  {
    id: 2,
    bgcolor: "linear-gradient(141deg, #CCFFC8 0%, rgba(250, 214, 214, 0.00) 100%)",
    hovercolor: "linear-gradient(141deg, #CCFFC8 0%, rgba(250, 214, 214, 0.8) 0%)",
    name: "One-to-Many",
    image: "/images/OtoM.png",
    linkTo: "face-to-face/one-to-many",
  }
];

const Page = () => {
  return (
    <>
      <Box
        sx={{
          background: "#E9F8FF"
        }}
        pt={10}
        pb={20}
      >
        <Typography sx={{textAlign: 'center', margin: 'auto'}} pb={8} width={'65%'}>
          A teacher guides a group of thirty students in an online classroom, promoting interaction, teamwork, and peer learning. Options available: One-to-Many Basic and One-to-Many Premium. Embrace active participation in One-to-Many classrooms.
        </Typography>
        <Grid container justifyContent="center" alignItems="center">
          {ProductsFacetoFace.map((product) => {
            return (
              <Grid
                item
                sm={4}
                md={4}
                lg={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={2}
                key={product.id}
              >
                <TransitionBox iy="5rem" ay={0} ds={0.8}>
                  <CardsLikeProduct product={product} />
                </TransitionBox>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Page;
