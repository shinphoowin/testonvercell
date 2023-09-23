import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/api";

const initialState = {
  loading: false,
  haveData: false,
  haveError: false,
  courses: [],
  errMsg: ""
};

export const fetchCourses = createAsyncThunk("courses/getData", async (token, {rejectWithValue}) => {
  return fetch(`${api.apiRoot}/courses`, {
        method: "GET", // or 'PUT'
        //mode: 'cors',
        headers: {
          //"Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          // 'Access-Control-Allow-Origin': '*'
        }
      }).then(res => res.json())
      .then(result => result)
      .catch(err => rejectWithValue(err))
});

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state, action) => {
      state.loading = true;
      state.haveData = false;
      state.haveError = false;
      state.errorMsg = "Request to fetching api data is pending.";
    }).addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload.data || action.payload.data.data;
      state.loading = false;
      state.haveData = true;
      state.haveError = false;
      state.errorMsg = "";
    }).addCase(fetchCourses.rejected, (state, action) => {
      state.loading = false;
      state.haveError = true;
      state.haveData = false;
      state.errorMsg = "Request to fetching api data is rejected.";
    })
  }
})
export default coursesSlice.reducer;
