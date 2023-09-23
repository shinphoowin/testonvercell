import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Grid } from '@mui/material';

export default function RadioGroupMui({ payments }) {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{ display: 'flex' }}
      >
        <Grid container spacing={2} mb={1}>
          {payments.map(payment =>
            <Grid item xs={6} lg={3} md={4} key={payment.id} sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                sx={{
                  height: 40,
                  width: 40,
                  maxHeight: { xs: 40, md: 40 },
                  maxWidth: { xs: 40, md: 40 },
                  objectFit: "contain",
                  marginLeft: '-15px',
                  marginBottom: '-4px'
                }}
                alt="payments"
                src={payment.imgUrl} />
              <FormControlLabel
                value={payment.value}
                control={<Radio />}
              //label={payment.label}
              />
            </Grid>
          )}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
