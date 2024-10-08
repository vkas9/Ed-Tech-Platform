import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrollData } from "./fetchEnrollData";
import { Link } from "react-router-dom";

const EnrolledCourse = () => {
  const dispatch = useDispatch();
  const { enrolledCourse } = useSelector((store) => store.card);
  const { user: data } = useSelector((store) => store.profile);

  useEffect(() => {
    if (!data || data.role !== "Student") return;
    const controller = new AbortController();
    const signal = controller.signal;

    if (!enrolledCourse) {
      fetchEnrollData(data, dispatch, signal);
    }

    return () => {
      controller.abort();
    };
  }, [enrolledCourse, data, dispatch]);
  

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg pt-2 pl-5"
    >
      <div className="flex gap-1 text-white/50 scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto">
      <Link to={"/"} className="sm:hover:underline active:text-white  sm:hover:text-white ">Home</Link>
        <span>/</span>
        <Link to={"/dashboard/my-profile"} className="sm:hover:underline active:text-white  sm:hover:text-white " >Dashboard</Link>
        <span>/</span>
        <span className="text-yellow-500 whitespace-nowrap">Enrolled Courses</span>
      </div>

      <h1 className="text-3xl mb-3">Enrolled Course <span>({enrolledCourse?.length})</span></h1>
      <div className="overflow-y-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full pb-[12rem] sm:pb-[10rem] max-h-[calc(100vh-11rem)]">
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
