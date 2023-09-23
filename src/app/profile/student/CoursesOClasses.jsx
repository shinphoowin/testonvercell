import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const CoursesOrClasses = ({ course }) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  // const { loadig, haveData, haveError, courseDetail } = useSelector(state => state.courseData)
  //console.log("---->", course)
  const handleFetchCourse = (courseId) => {
    //dispatch(fetchCourse(courseId));
    push(`student/courses/${courseId}`);
  }
  return (
    <Stack
      key={course.id}
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
        mb: 2
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, width: '100%' }}>
        <Box
          sx={{
            
            width: "20%",
            height: 80,
            overflow: "hidden",
          }}
        >
          <Image
            alt="next iamge"
            src="/images/logo-2.jpg"
            width={85}
            height={70}
            placeholder="courses img"
            blurDataURL="/images/logo-2.jpg"
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography fontSize="18px" fontWeight="bold">
            {course.course_name} - {course.id}
          </Typography>
          <Box display={"flex"} gap={3} mt={2}>
            <Typography display={"flex"} alignItems="center" gap={1}>
              <AutoStoriesIcon /> 25+ lessons
            </Typography>
            <Typography display={"flex"} alignItems="center" gap={1}>
              <WatchLaterIcon /> 32 hours 23 mins
            </Typography>
          </Box>
          <Box display={"flex"} gap={3} mt={2}>
            {course.teachers.map((teacher,i) => 
              <Typography display={"flex"} alignItems="center" gap={1} key={i}>
                Purchase from teacher - {teacher.email} - (teachrId={teacher.id})
              </Typography>
            )}
          </Box>
        </Box>

        <Button
          sx={{ px: 4, py: 2, borderRadius: "15px" }}
          variant="outlined"
          color="inherit"
          disabled={false}
          onClick={() => handleFetchCourse(course.id)}
        >
          Detail
        </Button>

        <Button
          sx={{ px: 4, py: 2, borderRadius: "15px" }}
          variant="outlined"
          color="inherit"
          disabled={false}
        >
          Remove
        </Button>
      </Box>

      {/* {course?.purchased?.meet_linkk ? (
        <Button
          sx={{ px: 4, py: 2, borderRadius: "15px" }}
          variant="outlined"
          color="inherit"
          target="_blank"
        //onClick={() => handleJoinMeeting(assignedClasses?.meeting?.meeting_link)}
        //href={course?purchased?.meet_link}
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
      )} */}
    </Stack>
  );
};

export default CoursesOrClasses;
