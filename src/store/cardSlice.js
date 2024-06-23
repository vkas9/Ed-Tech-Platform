import { createSlice } from "@reduxjs/toolkit";
import { decryptData } from "./../components/core/auth/crypto";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  enrolledCourse: null,
  wishlist: null
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
    setWishlist(state, action) {
      state.wishlist = action.payload;
    },
    setEnrolledCourse(state, action) {
      state.enrolledCourse = action.payload;
    },
    reset(state) {
      state.wishlist = null;
      state.enrolledCourse = null;
      state.totalItems = 0;
    },
  },
});
export const cardAction = cardSlice.actions;

export default cardSlice;
