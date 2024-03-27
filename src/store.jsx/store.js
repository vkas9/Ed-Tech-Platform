import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{},
    reducers:{
        
    }
})


const counterStore=configureStore({
    reducer:{}
})

export default counterStore;