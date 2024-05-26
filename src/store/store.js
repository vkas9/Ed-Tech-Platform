import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cardSlice from "./cardSlice";
import profileSlice from "./profileSlice";
import courseSlice from "./courseSlice";


const Store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        card:cardSlice.reducer,
        profile:profileSlice.reducer,
        course:courseSlice.reducer

    }
})

export default Store;