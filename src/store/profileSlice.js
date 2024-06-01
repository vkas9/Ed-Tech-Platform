import { createSlice } from "@reduxjs/toolkit";
import {decryptData} from "../components/core/auth/crypto"

const initialState = {
  user: localStorage.getItem("_/u%__?")
    ? decryptData(localStorage.getItem("_/u%__?"))
    : null,
  loading: false,
};


const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.user = action.payload;
     
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const profileAction = profileSlice.actions;


export default profileSlice;
