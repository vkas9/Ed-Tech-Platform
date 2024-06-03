import { motion } from "framer-motion";
import CourseCard from "./MyCourseCard";
import { useEffect } from "react";
import { getAllInstructorCourses } from "../../../APIs/Authapi";
import { useDispatch, useSelector } from "react-redux";
import { courseAction } from "../../../store/courseSlice";

const AllCourse = () => {
  const dispatch = useDispatch();
  const { allInstructoreCourses,creatingCourse } = useSelector((store) => store.course);
    // console.log("creatingCourse",allInstructoreCourses)
    const {user:data} =  useSelector((store) => store.profile);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        
        if (data && data.role==="Instructor" ) {
          const courseData = await getAllInstructorCourses(signal);
          // console.log("courseData->",courseData)
          if (!signal.aborted) {

            localStorage.setItem(import.meta.env.VITE_INSTRUCT_ALL_C, JSON.stringify(courseData.instructorCourses));
            dispatch(courseAction.setIC(courseData.instructorCourses));
          }
        } else {
          localStorage.setItem(import.meta.env.VITE_INSTRUCT_ALL_C, JSON.stringify([]));
          dispatch(courseAction.setIC([]));
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log("Unable to fetch enrolled courses");
        }
      }
      dispatch(courseAction.setCreatingCourse(false));
    };

    if (creatingCourse|| !allInstructoreCourses) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [allInstructoreCourses, dispatch]);

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
        <span className="text-yellow-500">My Courses </span>
      </div>

      <h1 className="text-3xl mb-3">My Courses{allInstructoreCourses&&<span className="ml-2">({allInstructoreCourses.length})</span>}</h1>
      <div className="overflow-auto   max-h-[75vh]">
        {!allInstructoreCourses ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : allInstructoreCourses.length ? (
          allInstructoreCourses.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))
        ) : (
          <p className="relative text-center mr-3 top-1/3 sm:top-1/2 sm:left-[2%] md:left-[20%] lg:left-[35%] text-2xl font-semibold sm:w-fit text-white/40">
            You have not Created any course yet!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AllCourse;
