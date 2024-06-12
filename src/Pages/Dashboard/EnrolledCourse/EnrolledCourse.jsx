import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { useEffect } from "react";
import { getCourseDetail } from "../../../APIs/Authapi";
import { useDispatch, useSelector } from "react-redux";
import { cardAction } from "../../../store/cardSlice";
import {encryptData} from "../../../components/core/auth/crypto"
const EnrolledCourse = () => {
  const dispatch = useDispatch();
  const { enrolledCourse } = useSelector((store) => store.card);
  const {user:data} =  useSelector((store) => store.profile);
//  console.log("enrolledCourse",enrolledCourse)
  useEffect(() => {
    if (!data || data.role !== "Student") return;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        
        
        if (data && data.Courses && data.Courses.length > 0) {
          const courseData = await getCourseDetail(data.Courses, signal);
          // console.log("courseData->",courseData)
          if (!signal.aborted) {
            const text=encryptData(courseData.data.courseDetail)
        
            localStorage.setItem(import.meta.env.VITE_ENROLL_C,text);
            dispatch(cardAction.setEnrolledCourse(courseData.data.courseDetail));
          }
        } else {
          localStorage.setItem(import.meta.env.VITE_ENROLL_C, JSON.stringify([]));
          dispatch(cardAction.setEnrolledCourse([]));
        }
      } catch (error) {
        if (!controller.signal.aborted){

        
          toast.error("Unable to fetch Enrolled Courses");
        }
      }
    };

    if (!enrolledCourse) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [enrolledCourse,data, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg pt-2 pl-5"
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto">
        <span>Home</span>
        <span>/</span>
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-yellow-500 whitespace-nowrap">Enrolled Courses</span>
      </div>

      <h1 className="text-3xl mb-3">Enrolled Course</h1>
      <div className="overflow-auto  pb-[4rem] h-[75vh]">
        {!enrolledCourse ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : enrolledCourse.length ? (
          enrolledCourse.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))
        ) : (
          <p className="relative text-center mr-3 top-1/3 sm:top-1/2 sm:left-[2%] md:left-[20%] lg:left-[35%] text-2xl font-semibold sm:w-fit text-white/40">
            You have not enrolled in any course yet!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default EnrolledCourse;
