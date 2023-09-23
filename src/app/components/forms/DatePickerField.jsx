"use client";
import { Typography } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { usePathname } from "next/navigation";

const DatePickerField = (props) => {
  const pathname = usePathname();

  //console.log(pathname, "curr");
  const { errors, touched, label, value, field, onChange, placeholder } = {
    ...props,
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        value={value}
        onChange={onChange}
        sx={{
          // bgcolor: pathname === "/" ? "#62A8E2" : "transparent",
          // overflow: "hidden",
          // borderColor: pathname === "/" ? "#FFF" : "#c8c8c8",
          // border: "1px solid #fff",
          // borderRadius: pathname === "/" ? "30px" : "15px",
          bgcolor: "#62A8E2",
          overflow: "hidden",
          borderColor: "#FFF",
          border: "1px solid #fff",
          borderRadius: "30px",
          "& .MuiButtonBase-root": {
            // color: pathname === "/" ? "#FFF" : "#454545",
            color: "#FFF",
            paddingRight: "10px",
          },
          "& fieldset": {
            border: "none",
          },
          "& .MuiInputBase-root > input": {
            height: 11,
            pr: 12,
            borderRadius: "30px",
            // color: pathname === "/" ? "#FFF" : "#454545",
            color: "#FFF",
            fontSize: "14px",
          },
        }}
        //label={placeholder}
      />
      {errors[field["name"]] && touched[field["name"]] && (
        <Typography
          variant="h6"
          fontSize="13px"
          pl={2}
          sx={{ color: "#dc3545" }}
        >
          {errors[field.name]}
        </Typography>
      )}
    </LocalizationProvider>
  );
};

export default DatePickerField;
