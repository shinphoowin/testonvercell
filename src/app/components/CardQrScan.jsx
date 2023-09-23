import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Dialog, Divider, Grid } from '@mui/material';
import { shallowEqual, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function CardQrScan({courseId}) {
  const { hastoken } = useSelector(state => ({ ...state.authData }), shallowEqual);
  const { push } = useRouter();

  const handlePushEnroll = (courseId) => {
    console.log("hitt", courseId)
    push(`/profile/student/purchased/join/${courseId}`)
  }
  return (
    <Card sx={{ borderRadius: '26px', padding: '20px 40px' }}>
      <CardContent>
        <Typography variant="h6" textAlign="center" sx={{
          color: '#243C4F',
          fontFamily: 'Raleway',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          marginTop: '18px'
        }} mb={4}>
          Scan QR Code for course Id - {courseId}
        </Typography>
        <img src="/images/MicrosoftTeams-image(41)1.png" style={{ display: 'block', margin: 'auto' }} />
        <Typography variant="h6" textAlign="center" pb={1} sx={{
          color: '#243C4F',
          fontFamily: 'Raleway',
          fontSize: '16px',
          fontWeight: 500
        }}>600ms</Typography>

        <Typography variant="h6" textAlign="center" pb={1} sx={{
          color: '#243C4F',
          fontFamily: 'Raleway',
          fontSize: '16px',
          fontWeight: 500
        }}>
          Kindly scan the QR Code provided using the KBZPay App.
          Once the payment process is completed,
          you will be able to begin studying your purchased courses immediately
          after receiving a notification on the ILBC EduPlus Platform.
        </Typography>

        <Typography variant="h6" textAlign="center" pb={1} sx={{
          color: '#243C4F',
          fontFamily: 'Raleway',
          fontSize: '16px',
          fontWeight: 500
        }}>
          <a style={{
            // border: '1px solid #ddd',
            // margin: 'auto',
            // display: 'block',
            color: '#444',
            textDecoration: 'underline'
          }}
          // href="https://www.google.com/"
          onClick={() => handlePushEnroll(courseId)}
          >Payment process done</a>
        </Typography>
      </CardContent>
    </Card>
  );
}
