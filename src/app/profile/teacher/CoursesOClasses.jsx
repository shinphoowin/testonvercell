'use client'
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

const CoursesOrClasses = ({ assignedClass }) => {
  //console.log(assignedClass);
  return (
    <Stack
      key={assignedClass.id}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      sx={{
        borderRadius: "25px",
        border: "1px solid #eee",
        boxShadow: "3px 3px 5px #eee",
        padding: 3,
        "&:hover": {
          boxShadow: "3px 3px 1px #ddd",
        },
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          sx={{
            borderRadius: "25px",
            width: 85,
            height: 70,
            overflow: "hidden",
          }}
        >
          <Image
            alt="next iamge"
            src="/images/logo.png"
            width={85}
            height={70}
            placeholder="courses or classes"
            blurDataURL="/images/logo.png"
          />
        </Box>
        <Box>
          <Typography fontSize="18px" fontWeight="bold">
            {assignedClass.course_name} - {assignedClass.id}
          </Typography>
          <Typography fontSize="12px" fontWeight="bold">
              {assignedClass?.meeting?.meet_link}
            </Typography>
          <Box display={"flex"} gap={3} mt={2}>
            <Typography display={"flex"} alignItems="center" gap={1}>
              <AutoStoriesIcon /> 25+ lessons
            </Typography>
            <Typography display={"flex"} alignItems="center" gap={1}>
              <WatchLaterIcon /> {assignedClass.period}
            </Typography>            
          </Box>
        </Box>
      </Box>

      {assignedClass?.meeting?.meet_link ? (
        <Button
          sx={{ px: 4, py: 2, borderRadius: "15px" }}
          variant="outlined"
          color="inherit"
          target="_blank"
          //onClick={() => handleJoinMeeting(assignedClasses?.meeting?.meeting_link)}
          href={assignedClass?.meeting?.meet_link}
        >
          Join
        </Button>
      ) : (
        <>
          <Button
            sx={{ px: 4, py: 2, borderRadius: "15px" }}
            variant="outlined"
            color="inherit"
            disabled={true}
          >
            Join
          </Button>
        </>
      )}
    </Stack>

  );
};

export default CoursesOrClasses;
