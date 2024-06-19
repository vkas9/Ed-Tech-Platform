import toast from "react-hot-toast";
import { getCourseDetail } from "../../../APIs/mainAPI";
import { decryptData, encryptData } from "../../../components/core/auth/crypto";
import { cardAction } from "../../../store/cardSlice";

export const fetchEnrollData = async (
  data,
  dispatch,
  signal,
  buying = null
) => {
  try {
    if ((data && data.Courses && data.Courses.length > 0) || buying) {
      const courseData = await getCourseDetail(data.Courses, signal);
      if (!signal.aborted) {
        localStorage.setItem(
          import.meta.env.VITE_ENROLL_C,
          courseData.data.courseDetail
        );
        const decyptEnrollData = decryptData(courseData.data.courseDetail);
        dispatch(cardAction.setEnrolledCourse(decyptEnrollData));
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
