import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../config/api"

const initialState = {
  loading: false,
  haveData: false,
  haveError: false,
  purchasedcourseDetail: {},
  errorMsg: ""
}

export const fetchpurchasedCourse = createAsyncThunk("purchasedcourse/detail", async (id, thunkAPI) => {
  //console.log("fetchcourse hit", thunkAPI.getState().authData.hastoken, thunkAPI.getState().authData.userId, id)
  return fetch(`${api.apiRoot}/get/${thunkAPI.getState().authData.userId}/purchasedcourseDetails/${id}`, {
    method: "GET", // or 'PUT'
    headers: {
      //"Content-Type": "application/json",
      'Authorization': `Bearer ${thunkAPI.getState().authData.hastoken}`,
      // 'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json())
    .then(result => result)
    .catch(err => thunkAPI.rejectWithValue(err))
})

export const purchasedCourseSlice = createSlice({
  name: 'purchasedCourse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchpurchasedCourse.pending, (state, action) => {
      state.loading = true;
      state.haveData = false;
      state.haveError = false;
      state.errorMsg = "Request to fetching api data is pending.";
    }).addCase(fetchpurchasedCourse.fulfilled, (state, action) => {
      // console.log(action)
      state.loading = false;
      state.haveData = true;
      state.haveError = false;
      state.errorMsg = "",
      state.purchasedcourseDetail = action.payload.data
    }).addCase(fetchpurchasedCourse.rejected, (state, action) => {
      state.loading = false;
      state.haveError = false;
      state.haveData = false;
      state.errorMsg = "Request to fetching api data is rejected";
    })
  }
})
export default purchasedCourseSlice.reducer;