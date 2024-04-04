import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState: {token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null},
    reducers:{
        setToken(state,action){
            state.token=action.payload;
        }
    }
})
export const authAction=authSlice.actions;

export default authSlice;