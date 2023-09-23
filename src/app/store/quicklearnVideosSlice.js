import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api, { doRequest } from "../config/api"

const initialState = {
  loading: false,
  haveData: false,
  haveError: false,
  videos: [],
  errorMsg: ''
}

export const fetchQuickLearnVideos = createAsyncThunk('videos/getData', async (_, { rejectWithValue }) => {
  return fetch(`${api.apiRoot}+videos`).then(res => res.json()).then(result => {
    return result;
  }).catch(err => {
    return rejectWithValue(err)
  })
})

export const quicklearnVideosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuickLearnVideos.pending, (state, action) => {
      console.log("I", action)
      state.loading = true;
      state.haveData = false;
      state.haveError = false;
      state.errorMsg = "Request to fetching api data is pending still !";
    }).addCase(fetchQuickLearnVideos.rejected, (state, action) => {
      console.log("III", action)
      state.loading = false;
      state.haveError = true;
      state.haveData = false;
      state.errorMsg = "Request to fetching api data is rejected :(";
    }).addCase(fetchQuickLearnVideos.fulfilled, (state, action) => {
      console.log("II", action)
      state.videos = action.payload.videos || [];
      state.loading = false;
      state.haveData = true;
      state.haveError = false;
      state.errorMsg = "error catching lane";
    })
  }
})
export default quicklearnVideosSlice.reducer;