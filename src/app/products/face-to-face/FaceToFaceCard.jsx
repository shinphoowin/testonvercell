import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Divider, Grid } from '@mui/material';
import { AutoStories, WatchLater } from "@mui/icons-material";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { shallowEqual, useSelector } from 'react-redux';
import LoginForm from '@/app/(auth)/login/LoginForm';
import { useRouter } from 'next/navigation';
import ModalRegister from '@/app/(auth)/register/modalRegister';

export default function FaceToFaceCard({ onClick, obj }) {
  const [showDialog, setShowDialog] = useState(false);
  const { hastoken } = useSelector(state => ({ ...state.authData }), shallowEqual);
  const { push } = useRouter();

  const handlePushEnroll = (courseId) => {
    push(`/profile/student/courses/${courseId}`)
  }
  return (
    <>
      <Card sx={{ maxWidth: '100%', borderRadius: '26px', height: 440 }} onClick={!hastoken ? () => setShowDialog(true) : () => handlePushEnroll(obj.id)}>
        <CardMedia
          component="img"
          // height="194"
          image="/images/ftf_sampleimage.png"
          alt="face to face card img"
          loading="lazy"
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontSize: '18px' }}>
            {obj.course_name}
          </Typography>

          <Grid item textAlign="right" mt={-2}>
            <IconButton aria-label="add to favorites" onClick={!hastoken ? () => setShowDialog(true) : onClick}>
              <FavoriteIcon htmlColor={obj.isFavourite ? "#F81F84" : ''} />
            </IconButton>
            {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
          </Grid>
          <AutoStories sx={{ float: 'left', marginRight: 1, mt: -0.5 }} />  Basic Level
          <Grid container spacing={2} mb={3}>
            <Grid item xs={6}>
              <SignalCellularAltIcon sx={{ float: 'left', marginRight: 1 }} /> {obj.period}
            </Grid>
            <Grid item xs={6} textAlign="right">
              Start {obj.announce_date}
              {/* <sup>st</sup> */}
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="h6" textAlign="center" mt={2}>
            {obj.price} MMK
          </Typography>
        </CardContent>
      </Card>
      {/* <LoginForm
        open={showDialog}
        setShowLoginDialog={setShowDialog} />  */}
      <ModalRegister
        open={showDialog}
        handleClose={setShowDialog} /> 
    </>
  );
}
