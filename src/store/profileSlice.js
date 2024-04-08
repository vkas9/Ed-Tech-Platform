import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({
    name:"profile",
    initialState: {user:null,loading:false},
    reducers:{
        setProfile(state,action){
            state.user=action.payload;
        },
        setLoading(state,action){
            state.loading=action.payload
        }
        
    }
})
export const profileAction=profileSlice.actions;

export default profileSlice;