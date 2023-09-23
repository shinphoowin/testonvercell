import { Alert } from '@mui/material'
import React from 'react'

export default function AlertError({ children }) {
  return (
    <Alert severity="error" sx={{ width: '95%!important', pb: '8px!important', pr: '0px!important' }}>
      {children}
    </Alert>
  )
}
