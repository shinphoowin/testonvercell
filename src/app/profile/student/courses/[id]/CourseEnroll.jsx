import ButtonPrimary from "@/app/components/ButtonPrimary";
import CardPayment from "@/app/components/CardPayment";
import CardQrScan from "@/app/components/CardQrScan";
import RenderCircularProgress from "@/app/components/RenderCircularProgress";
import api from "@/app/config/api";
import {
  AutoStories,
  WatchLater,
} from "@mui/icons-material";
import { Box, Card, CardMedia, Container, Link, Modal, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

const CourseEnroll = ({ courseId }) => {
  const [statusMsg, setStatusMsg] = useState("");
  const { push } = useRouter();
  const { hastoken } = useSelector(state => state.authData, shallowEqual);
  const [showDialog, setShowDialog] = useState(false);
  const [showQrScanDialog, setShowQrScanDialog] = useState(false);
  const handleEnroll = () => {
    fetch(`${api.apiRoot}/courses/purchase/${courseId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${hastoken}`,
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setStatusMsg(result.message)
        push('/profile/student')
      })
      .catch(err => err)
  }

  const handleShowHideModal = () => {
    setShowQrScanDialog(true);
    setShowDialog(false);
  }

  if (status === 'loading') {
    <Box sx={{ background: "url(images/bgicon.png)", py: 5 }}>
      <Container>
        <Box
          sx={{
            border: "1px solid #eee",
            bgcolor: "white",
            borderRadius: "25px",
            p: 3,
            mt: 3,
          }}
        >
          <RenderCircularProgress />
        </Box>
      </Container>
    </Box>
  }

  return (
    <>
      <Stack gap={2} mt={4}>
        {[1].map((index) => {
          return (
            <Box
              key={index}
              sx={{
                height: "60px",
                background:
                  "linear-gradient(92deg, #DCDCDC 1.84%, rgba(218, 218, 218, 0.00) 100%)",
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #243C4F",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <AutoStories />
                </Box>
                <Typography>Class-A</Typography>
              </Box>
              <ButtonPrimary onClick={() => setShowDialog(true)}>Enroll for purchase-{courseId}</ButtonPrimary>
            </Box>
          );
        })}
      </Stack>
      {/* payment methods */}
      <Modal
        open={showDialog}
        onClose={() => setShowDialog(false)}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          p: 0,
          width: '620px'
        }}>
          <CardPayment onClick={handleShowHideModal} courseId={courseId}/>
        </Box>        
      </Modal>
      {/* payment qr scan */}
      <Modal
        open={showQrScanDialog}
        onClose={() => setShowQrScanDialog(false)}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          p: 0,
          width: '620px'
        }}>
          <CardQrScan courseId={courseId}/>
        </Box>        
      </Modal>
    </>
  );
};

export default CourseEnroll;
