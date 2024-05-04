

import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { getCourseDetail } from "../../../Auth/Authapi";

const EnrolledCourse = () => {
  const[enrolledCourses,setEnrolledCourses]= useState([]);
   
    useEffect(()=>{
      const data=JSON.parse(localStorage.getItem("user"));
      
      const courseData=getCourseDetail(data.Courses[0]);
      
      
    })
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
      {
        enrolledCourses.length?enrolledCourses.map((course,index)=>(

          <div className="flex justify-between">
            <div className=" flex">
              <img src={course.Thumbnail} alt="course-thumbnail" className="max-w-[100px] rounded-2xl " />
              <div>
                <h2>{course.CourseName}</h2>
                <p>{course.CourseDescription}</p>
              </div>
            </div>
            <div>
              <span>{course?.duration}</span>
            </div>
            <div>
              <p>Progress: 0%</p>
            </div>

           
          </div>

        ))
        
        
      
        :<p>You have not Enrolled in any Course Yet !</p>
      }
     
    </motion.div>
  );
};
export default EnrolledCourse;