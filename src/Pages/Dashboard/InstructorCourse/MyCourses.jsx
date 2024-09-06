import { motion } from "framer-motion";
import MyCourseCard from "./MyCourseCard";
import { useEffect } from "react";
import { getAllInstructorCourses } from "../../../APIs/mainAPI";
import { useDispatch, useSelector } from "react-redux";
import { courseAction } from "../../../store/courseSlice";
import { encryptData } from "../../../components/core/auth/crypto";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { allInstructoreCourses, creatingCourse } = useSelector(
    (store) => store.course
  );
  const { user: data } = useSelector((store) => store.profile);
  useEffect(() => {
    if (!data || data.role !== "Instructor") return; // Exit early if not an instructor or no user data

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const courseData = await getAllInstructorCourses(signal);
        if (!signal.aborted) {
          dispatch(courseAction.setIC(courseData));
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("Unable to fetch enrolled courses");
        }
      }
      dispatch(courseAction.setCreatingCourse(false));
    };

    if (creatingCourse || !allInstructoreCourses) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [creatingCourse, allInstructoreCourses, data, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg pt-2 pl-5"
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      <Link to={"/"} className="sm:hover:underline active:text-white  sm:hover:text-white ">Home</Link>
        <span>/</span>
        <Link to={"/dashboard/my-profile"} className="sm:hover:underline active:text-white  sm:hover:text-white " >Dashboard</Link>
        <span>/</span>
        <span className="text-yellow-500 whitespace-nowrap">My Courses </span>
      </div>

      <h1 className="text-3xl mb-3">
        My Courses
        {allInstructoreCourses && (
          <span className="ml-2">({allInstructoreCourses.length})</span>
        )}
      </h1>
      <div className="overflow-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full pb-[8rem] max-h-[75vh]">
        {!allInstructoreCourses ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : allInstructoreCourses.length ? (
          allInstructoreCourses.map((course, index) => (
            <MyCourseCard course={course} key={index} />
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

export default MyCourses;
