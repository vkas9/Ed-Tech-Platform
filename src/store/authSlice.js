import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem(import.meta.env.VITE_TOKEN)
      ? JSON.parse(localStorage.getItem(import.meta.env.VITE_TOKEN))
      : null,
    loading: false,
    signupdata: null,
    forgotPassword: false,
    userEmail: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSignUpData(state, action) {
      state.signupdata = action.payload;
    },
    setForgotPassword(state, action) {
      state.forgotPassword = action.payload;
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload;
    },
  },
});
export const authAction = authSlice.actions;

export default authSlice;
