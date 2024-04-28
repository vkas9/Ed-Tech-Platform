

import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
const EnrolledCourse = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg  pt-2 pl-5 "
    >
      <div className="flex gap-1 ">
        <span>Home</span>
        <span>/</span>
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-yellow-500 ">Enrolled Courses</span>
      </div>

      <h1 className=" text-3xl">Enrolled Course</h1>
      <CourseCard/>
    </motion.div>
  );
};
export default EnrolledCourse;
