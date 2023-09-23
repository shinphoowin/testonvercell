import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Divider, Grid } from '@mui/material';
import { shallowEqual, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import RadioGroupMui from './forms/RadioGroupMui';

export default function CardPayment({ onClick, courseId }) {
  const { hastoken } = useSelector(state => ({ ...state.authData }), shallowEqual);
  const { push } = useRouter();
  const paymentMethods = [
    { id: 1, label: "kpay", value: "kpay", imgUrl: "/images/pay_m1.png"},
    { id: 2, label: "anon1", value: "anon1", imgUrl: "/images/pay_m2.png"},
    { id: 3, label: "wavepay", value: "wavepay", imgUrl: "/images/pay_m3.png"},
    { id: 4, label: "mastercard", value: "mastercard", imgUrl: "/images/pay_m4.png"},
    { id: 5, label: "m-pikesan", value: "m-pikesan", imgUrl: "/images/pay_m3.png"},
    { id: 6, label: "visa", value: "visa", imgUrl: "/images/pay_m6.png"},
    { id: 7, label: "mpu", value: "mpu", imgUrl: "/images/pay_m7.png"},
    { id: 8, label: "citizen-pay", value: "citizen-pay", imgUrl: "/images/pay_m8.png"},
  ]

  return (
    <Card sx={{ borderRadius: '26px', padding: '20px 130px', minHeight: '400px' }}>
      <CardContent>
        <Typography variant="h6" textAlign="center" sx={{
          color: '#243C4F',
          fontFamily: 'Raleway',
          fontSize: '40px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal'
        }}>
          Payment Detail
        </Typography>
        <Typography variant="h6" textAlign="center" sx={{
          color: '#243C4F',
          fontFamily: 'Raleway',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          marginTop: '18px'
        }} mb={4}>
          Select Payment Method for courseId - {courseId}
        </Typography>

        <RadioGroupMui payments={paymentMethods}/>
        
        <Typography variant="h6" textAlign="center" pb={1}>
          3000 MMK
        </Typography>

        <Divider/>

        <Grid container spacing={2} mb={0} mt={1}>
          <Grid item xs={6} sx={{lineHeight: '10px'}}>
            Total
          </Grid>
          <Grid item xs={6} textAlign="right" sx={{lineHeight: '8px'}}>
            Start Oct 1 <sup>st</sup>
          </Grid>

          <Grid item xs={6} sx={{lineHeight: '8px'}}>
            Discount
          </Grid>
          <Grid item xs={6} textAlign="right" sx={{lineHeight: '8px'}}>
            Start Oct 1 <sup>st</sup>
          </Grid>

          <Grid item xs={6} sx={{lineHeight: '10px'}}>
            Grand Total
          </Grid>
          <Grid item xs={6} textAlign="right" sx={{lineHeight: '10px'}}>
            Start Oct 1 <sup>st</sup>
          </Grid>
        </Grid>
        <Button sx={{
          border:'1px solid #ddd', 
          margin: 'auto', 
          display: 'block', 
          width: '150px',
          borderRadius: '41px',
          border: "1.5px solid #C8C8C8"}} onClick={() => onClick(true)}>Pay Now</Button>
      </CardContent>
    </Card>
  );
}
