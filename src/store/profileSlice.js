import { createSlice } from "@reduxjs/toolkit";
import {decryptData} from "../components/core/auth/crypto"
import { disablePageScroll, enablePageScroll } from "scroll-lock";
const initialState = {
  user: localStorage.getItem(import.meta.env.VITE_USER)
    ? decryptData(localStorage.getItem(import.meta.env.VITE_USER))
    : null,
  loading: false,
  openNavigation:false,
  sidebarShow:false
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
    setOpenNavigation: (state, action) => {
      state.openNavigation = action.payload;

      if (state.openNavigation) {
        disablePageScroll();
      } else {
        enablePageScroll();
      }
    },
    setSidebarShow(state,action){
      state.sidebarShow=action.payload
    }
  },

});

export const profileAction = profileSlice.actions;


export default profileSlice;
