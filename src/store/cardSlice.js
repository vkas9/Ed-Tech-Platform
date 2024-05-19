import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  enrolledCourse: localStorage.getItem("enrolledCourses")
    ? JSON.parse(localStorage.getItem("enrolledCourses"))
    : null,
  wishlist: localStorage.getItem("Wishlist")
    ? JSON.parse(localStorage.getItem("Wishlist"))
    : null
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
      state.wishlist = initialState.wishlist;
      state.enrolledCourse = initialState.enrolledCourse;
    },
  },
});
export const cardAction = cardSlice.actions;

export default cardSlice;
