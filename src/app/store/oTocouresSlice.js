import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/api";

const initialState = {
  loading: false,
  haveData: false,
  haveError: false,
  otocourses: [],
  errMsg: ""
};

export const fetchoToCourses = createAsyncThunk("otocourses/getData", async (_, thunkAPI) => {
  return fetch(`${api.apiRoot}/get/coursesbycategory/one-to-one`, {
    method: "GET", // or 'PUT'
    //mode: 'cors',
    headers: {
      //"Content-Type": "application/json",
      // 'Authorization': `Bearer ${thunkAPI.getState().authData.hastoken}`,
      // 'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json())
    .then(result => result)
    .catch(err => thunkAPI.rejectWithValue(err))
});

export const otocoursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchoToCourses.pending, (state, action) => {
      state.loading = true;
      state.haveData = false;
      state.haveError = false;
      state.errMsg = "Request to fetching api data is pending.";
    }).addCase(fetchoToCourses.fulfilled, (state, action) => {
      // console.log(action)
      state.otocourses = action.payload.courses || action.payload.data.data;
      state.loading = false;
      state.haveData = true;
      state.haveError = false;
      state.errMsg = "";
    }).addCase(fetchoToCourses.rejected, (state, action) => {
      state.loading = false;
      state.haveError = true;
      state.haveData = false;
      state.errMsg = "Request to fetching api data is rejected.";
    })
  }
})
export default otocoursesSlice.reducer;
