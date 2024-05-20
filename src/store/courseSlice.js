import { createSlice } from "@reduxjs/toolkit";

const initialState={
    step:1
}
const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep(state,action){
            state.step=action.payload;
        }
    }
})
export const courseAction=courseSlice.actions;
export default courseSlice;