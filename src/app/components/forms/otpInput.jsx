import { Typography } from "@mui/material";
import React from "react";
import OtpInput from "react-otp-input";

export default function RenderOTPInput(formikProps) {
  const {
    errors,
    touched,
    label,
    type,
    field,
    placeholder,
    height,
    value,
    onChange,
  } = { ...formikProps };
  return (
    <>
      <OtpInput
        className="opt-input"
        containerStyle={{
          width: "90%",
          paddingTop: "10.35px",
          paddingBottom: "13px",
          margin: "auto",
        }}
        inputStyle={{
          width: "40.834px",
          height: "31.3px",
          margin: "auto",
          borderRadius: "8px",
          boxShadow: "none",
          border: "1px solid #42AAFF",
          marginTop: "-4px",
        }}
        value={value}
        onChange={onChange}
        numInputs={6}
        renderSeparator={<span></span>}
        renderInput={(props) => <input {...props} />}
        shouldAutoFocus={true}
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
    </>
  );
}
