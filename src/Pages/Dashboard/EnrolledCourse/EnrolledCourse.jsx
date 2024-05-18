import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { getCourseDetail } from "../../../Auth/Authapi";
import CryptoJS from "crypto-js";
const EnrolledCourse = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
     const cachedData = localStorage.getItem("enrolledCourses");
    return cachedData ? JSON.parse(cachedData) : null;
  });

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("user"));
        if (data && data.Courses && data.Courses.length > 0) {
          const courseData = await getCourseDetail(data.Courses);
          localStorage.setItem("enrolledCourses", JSON.stringify(courseData.data.courseDetail));
          setEnrolledCourses(courseData.data.courseDetail);
        } else {
          localStorage.setItem("enrolledCourses", JSON.stringify([]));
          setEnrolledCourses([]);
        }
      } catch (error) {
        console.log("Unable to fetch enrolled courses");
      }
    };
    const encryptedData = localStorage.getItem("EC");
    if (encryptedData) {

     if(!enrolledCourses){  
      var bytes = CryptoJS.AES.decrypt(localStorage.getItem("EC"), "EDVKAS9");
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setEnrolledCourses(JSON.parse(decryptedData)); }
    } else {
      fetchData();
    }
  }, [enrolledCourses]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg  pt-2 pl-5 "
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto ">
      <span>Home</span>
        <span>/</span>
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-yellow-500 ">Enrolled_Courses</span>
      </div>

      <h1 className=" text-3xl">Enrolled Course</h1>
      <div className="overflow-auto  h-[78vh] ">
        {!enrolledCourses ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : enrolledCourses.length ? (
          enrolledCourses.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))
        ) : (
          <p className=" relative text-center mr-3 top-1/3 sm:top-1/2 sm:left-[2%] md:left-[20%] lg:left-[35%] text-2xl font-semibold sm:w-fit text-white/40 "  >You have not enrolled in any course yet !</p>
        )}
      </div>
    </motion.div>
  );
};
export default EnrolledCourse;
