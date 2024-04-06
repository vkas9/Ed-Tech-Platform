import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    totalItems: localStorage.getItem("totalItems")
      ? JSON.parse(localStorage.getItem("totalItems"))
      : 5,
  },
  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
    addToCard(state, action) {},
  },
});
export const cardAction = cardSlice.actions;

export default cardSlice;
