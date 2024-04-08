import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({
    name:"profile",
    initialState: {user:null},
    reducers:{
        setProfile(state,action){
            state.user=action.payload;
        },
        
    }
})
export const profileAction=profileSlice.actions;

export default profileSlice;