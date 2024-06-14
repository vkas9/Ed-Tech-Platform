import toast from "react-hot-toast";
import { getCourseDetail } from "../../../APIs/Authapi";
import { encryptData } from "../../../components/core/auth/crypto";
import { cardAction } from "../../../store/cardSlice";

export const fetchEnrollData = async (data, dispatch, signal) => {
  try {
    if (data && data.Courses && data.Courses.length > 0) {
      const courseData = await getCourseDetail(data.Courses, signal);
      if (!signal.aborted) {
        const text = encryptData(courseData.data.courseDetail);
        localStorage.setItem(import.meta.env.VITE_ENROLL_C, text);
        dispatch(cardAction.setEnrolledCourse(courseData.data.courseDetail));
      }
    } else {
      localStorage.setItem(import.meta.env.VITE_ENROLL_C, JSON.stringify([]));
      dispatch(cardAction.setEnrolledCourse([]));
    }
  } catch (error) {
    if (!signal.aborted) {
      toast.error(error.message);
    }
  }
};
