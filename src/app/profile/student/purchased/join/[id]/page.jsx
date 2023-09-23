'use client'
import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CardMainProduct from '@/app/components/CardMainProducts';
import { fetchpurchasedCourse } from '@/app/store/purchasedCourseSlice';
import AlertError from '@/app/components/AlertError';
import AlertSuccess from '@/app/components/AlertSuccess';
import RenderCircularProgress from '@/app/components/RenderCircularProgress';

export default function JoinClass({ params }) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { hastoken, userId } = useSelector(state => ({ ...state.authData }), shallowEqual);
  const { push } = useRouter();
  const dispatch = useDispatch();
  // const handlePushEnroll = (courseId) => {
  //   push(`/profile/student/courses/${courseId}`)
  // }
  const { loading, haveData, haveError, purchasedcourseDetail, errorMsg } = useSelector((state) => ({ ...state.purchasedcourseData }), shallowEqual)
  useEffect(() => {
    dispatch(fetchpurchasedCourse(params.id))
  }, [])
  // console.log(purchasedcourseDetail)
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1280px",
        pt: 8, pb: 8
      }}>
      {
        loading ? <RenderCircularProgress /> :
          haveError ? <AlertError>{errorMsg}</AlertError> :
          haveData && !purchasedcourseDetail && purchasedcourseDetail !== undefined && Object.keys(purchasedcourseDetail).length == 0 ? <AlertSuccess>there is no data yet!.</AlertSuccess>:
            haveData &&
            <Grid container spacing={1} mb={6} mt={6}>
              <Grid item xs={10}>
                <Typography variant="h4" sx={{
                  color: '#243C4F',
                  fontFamily: 'Raleway',
                  lineHeight: 'normal',
                  marginTop: '18px'
                }} mb={4}>
                  Secure video conferencing for everyone
                </Typography>

                <Typography>
                  fetch purchased course detail for - {params.id}<br/>
                  authenticated user Id - {userId}<br/>
                  {/* meetinglink - {purchasedcourseDetail?.meetings[0]?.meet_link} */}
                </Typography>

                <Typography>
                  Connect, collaborate, and celebrate from anywhere with Google Meet
                </Typography>
                <Button
                  sx={{ px: 4, py: 2, borderRadius: "15px", textTransform: 'capitalize', marginTop: 8 }}
                  variant="outlined"
                  color="inherit"
                  target="_blank"
                  href={purchasedcourseDetail?.meetings[0]?.meet_link}
                  disabled={!purchasedcourseDetail?.meetings[0]?.meet_link ? true : false}
                >
                  Join Class
                </Button>
              </Grid>
              <Grid item xs={2} textAlign="right">
                {/* <CardMainProduct
                  imgUrl={"/images/OtoM.png"}
                  bgGradient="border-radius: 25px;background: linear-gradient(141deg, #D2C8FF 0%, rgba(255, 188, 232, 0.00) 100%);"
                /> */}
                <img src="/images/OtoM.png" width="100%" />
              </Grid>
            </Grid>
      }
    </Container>
  );
}
