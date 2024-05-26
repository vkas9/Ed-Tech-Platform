import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: {},
  editCourse: false,
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
     
    },
  },
});
export const courseAction = courseSlice.actions;
export default courseSlice;
