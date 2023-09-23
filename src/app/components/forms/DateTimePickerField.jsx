import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Typography } from '@mui/material';

export default function DateTimePickerField(props) {
  const { errors, touched, label, value, field, onChange } = {
    ...props,
  };  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        //label="Controlled picker"
        value={value}
        onChange={onChange}
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
}
