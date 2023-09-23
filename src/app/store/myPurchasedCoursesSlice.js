import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  haveData: false,
  haveError: false,
  myPurchasedCourses: [],
  errMsg: ""
}

export const fetchmyPurchasedCourses = createAsyncThunk('mycourses/getData', async (studentId, thunkAPI) => {
  return fetch(`https://edtech.ilbc.edu.mm/api/mycourses/show/${studentId}`, {
    method: "GET", // or 'PUT'
    //mode: 'cors',
    headers: {
      //"Content-Type": "application/json",
      'Authorization': `Bearer ${thunkAPI.getState().authData.hastoken}`,
      // 'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json())
    .then(result => result)
    .catch(err => thunkAPI.rejectWithValue(err))
})

export const myPurchasedCoursesSlice = createSlice({
  name: "mycourses",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchmyPurchasedCourses.pending, (state, action) => {
      state.loading = true;
      state.haveData = false;
      state.haveError = false;
      state.errMsg = "Request to fetching api data is pending.";
    }).addCase(fetchmyPurchasedCourses.fulfilled, (state, action) => {
      state.myPurchasedCourses = action.payload.data;
      state.loading = false;
      state.haveData = true;
      state.haveError = false;
      state.errMsg = ""
    }).addCase(fetchmyPurchasedCourses.rejected, (state, action) => {
      state.loading = false;
      state.haveError = true;
      state.haveData = false;
      state.errMsg = "Request to fetching api data is rejected.";
    })
  }
})
export default myPurchasedCoursesSlice.reducer;