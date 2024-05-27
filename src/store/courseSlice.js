import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: {},
  editCourse: false,
  allInstructoreCourses:localStorage.getItem("__IC_")
  ? JSON.parse(localStorage.getItem("__IC_"))
  : null,
  creatingCourse:false
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
      state.allInstructoreCourses=null
     
    },setIC(state, action) {
      state.allInstructoreCourses = action.payload;
    },
    setCreatingCourse(state,action){
      state.creatingCourse=action.payload
    }
  },
});
export const courseAction = courseSlice.actions;
export default courseSlice;
