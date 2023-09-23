import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const SectionButton = ({ section }) => {
  return (
    <Stack
      key={section.id}
      justifyContent="center"
      width={145}
      sx={{
        borderRadius: "15px",
        // border: section === s.section || "1px solid #333",
        alignItems: "center",
        height: 51,
        fontSize: 15,
        cursor: "pointer",
        background: "#757575"
      }}
      //onClick={() => setSection(s.section)}
    >
      <Typography
        fontWeight={700}
        fontSize={15}
        // sx={{ color: section === s.section && "white" }}
      >
        S - A
      </Typography>
      <Typography
        //sx={{ color: section === s.section && "white" }}
        fontWeight={400}
        fontSize={15}
      >
        {section.name}
      </Typography>
    </Stack>
  );
};

export default SectionButton;
