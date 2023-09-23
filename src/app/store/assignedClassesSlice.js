"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  haveData: false,
  haveError: false,
  errorMsg: "",
  assignedClasses: []
}

export const fetchAssignedCourses = createAsyncThunk('teacher/assignedcourses', async(tokenObj, thunkAPI) => {
  //console.log(tokenObj)
  return fetch(`https://edtech.ilbc.edu.mm/api/teacher/getAssigncourses/${tokenObj.userId}`, {
    method: "GET", // or 'PUT'
    headers: {
      //"Content-Type": "application/json",
      //'Authorization': `Bearer ${customToken}`,
      'Authorization':  `Bearer ${tokenObj.customToken}`,
      // 'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json())
    .then(result => result)
    .catch(err => thunkAPI.rejectWithValue(err))
})

export const assignedClassesSlice = createSlice({
  name: "assignedClasses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAssignedCourses.pending, (state, action) => {
      state.loading = true;
      state.haveData = false;
      state.haveError = false;
      state.errorMsg = "Request to fetching api data is pending.";
    }).addCase(fetchAssignedCourses.fulfilled, (state, action) => {
      // console.log("check assigned course",action)
      state.loading = false;
      state.haveData = true;
      state.haveError = false;
      state.assignedClasses = action?.payload?.data;
      state.errorMsg=""
    }).addCase(fetchAssignedCourses.rejected, (state, action) => {
      state.loading = false;
      state.haveData = false;
      state.haveError = true;
      state.errorMsg = "Request to fetching api data is rejected.";
    })
  }
})
export default assignedClassesSlice.reducer;