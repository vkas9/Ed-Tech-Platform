import { createSlice } from "@reduxjs/toolkit";
import { decryptData } from "../components/core/auth/crypto";

const initialState = {
  step: 1,
  course: {},
  editCourse: false,
  allInstructoreCourses:null,
  creatingCourse:false,
  exploreAllCourses:null,
  allPurchaseHistory:null
};
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    setCourse(state, action) {
      state.course = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    resetCourseState: (state,action) => {
      state.step = 1;
      state.editCourse = false;
      state.course = {};
      state.allInstructoreCourses=null,
      state.exploreAllCourses=null,
      state.allPurchaseHistory=null
     
    },setIC(state, action) {
      state.allInstructoreCourses = action.payload;
    },
    setCreatingCourse(state,action){
      state.creatingCourse=action.payload
    },
    setExploreAllCourses(state,action){
      state.exploreAllCourses=action.payload;
    },
    setPurchaseHistory(state,action){
      state.allPurchaseHistory=action.payload;
    }
  },
});
export const courseAction = courseSlice.actions;
export default courseSlice;
