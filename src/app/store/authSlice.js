"use client";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  hastoken: null,
  isLogin: false,
  name: '',
  email: '',
  userRole: '',
  userId: ''
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    hasLogin(state, action) {
      //console.log("authslice",current(state), action)
      if (action.payload) {
        try {
          window.localStorage.setItem("authTokenOwn", action.payload.token);
          window.localStorage.setItem("name", action.payload.user.name);
          window.localStorage.setItem("email", action.payload.user.email);
          window.localStorage.setItem("role", action.payload.user.role);
          window.localStorage.setItem("userId", action.payload.user.id)
        } catch (error) {
          //console.log(error.message);
          return error.message;
        }
      }

      if (window.localStorage.getItem("authTokenOwn")) {
        return {
          ...state,
          hastoken: window.localStorage.getItem("authTokenOwn"),
          name: window.localStorage.getItem("name"),
          email: window.localStorage.getItem("email"),
          userRole: window.localStorage.getItem("role"),
          userId: window.localStorage.getItem("userId"),
          isLogin: true,
        }
      }
    },
    dologOut(state, action) {
      window.localStorage.removeItem("authTokenOwn");
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("userId")
      return {
        hastoken: null,
        isLogin: false,
        name: "",
        email: "",
        userRole: "",
        userId: ""
      }
    }
  },
});
export const { hasLogin, dologOut } = authSlice.actions;
export default authSlice.reducer;
