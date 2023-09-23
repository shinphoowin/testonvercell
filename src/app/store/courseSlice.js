import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../config/api"

const initialState = {
  loading: false,
  haveData: false,
  haveError: false,
  courseDetail: {},
  errorMsg: ""
}

export const fetchCourse = createAsyncThunk("course/detail", async (id, thunkAPI) => {
  //console.log("fetchcourse hit", id, thunkAPI.getState().authData.hastoken)
  return fetch(`${api.apiRoot}/courses/${id}`, {
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

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.pending, (state, action) => {
      state.loading = true;
      state.haveData = false;
      state.haveError = false;
      state.errorMsg = "Request to fetching api data is pending.";
    }).addCase(fetchCourse.fulfilled, (state, action) => {
      // console.log(action)
      state.loading = false;
      state.haveData = true;
      state.haveError = false;
      state.errorMsg = "",
      state.courseDetail = action.payload.data
    }).addCase(fetchCourse.rejected, (state, action) => {
      state.loading = false;
      state.haveError = false;
      state.haveData = false;
      state.errorMsg = "Request to fetching api data is rejected";
    })
  }
})
export default courseSlice.reducer;