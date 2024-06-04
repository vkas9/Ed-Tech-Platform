import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../../APIs/Authapi";
import { courseAction } from "../../../store/courseSlice";
import ExploreCoursesCard from "./ExploreCoursesCard";
import { encryptData } from "../../../components/core/auth/crypto";
const Courses = () => {

  const dispatch = useDispatch();
  const { exploreAllCourses } = useSelector((store) => store.course);
  
  const [course, setCourses] = useState(exploreAllCourses);
  console.log("courses->",course)

  useEffect(() => {
    const controller=new AbortController();
    const signal=controller.signal;
    const fetchData = async () => {
      try {
        
          const courseData = await getAllCourse(signal);
          const text=encryptData(courseData);
          localStorage.setItem(import.meta.env.VITE_ALL_C,text);
          dispatch(courseAction.setExploreAllCourses(courseData));
        
      } catch (error) {
        console.log("Unable to fetch all courses");
      }
    };

    if (!course) {
      fetchData();
    }
    return ()=>{
      controller.abort();
    }
  }, [course, dispatch]);

  useEffect(() => {
    setCourses(exploreAllCourses);
  }, [exploreAllCourses]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg  pt-2 pl-5 "
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto items-center ">
        <span>Home</span>
        <span>/</span>
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-yellow-500 ">Courses</span>
      </div>
    <h1 className="text-3xl mb-3">Explore Courses</h1>
      <div className="overflow-auto h-[75vh]">
        {!course ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : course.length ? (
          course.map((course, index) => (
            course.status=="Published"&& <ExploreCoursesCard course={course} key={index} />
          ))
        ) : (
          <p className="relative text-center mr-3 top-1/3 sm:top-1/2 sm:left-[35%] text-2xl font-semibold sm:w-fit text-white/40">
             Course is empty!
          </p>
        )}
      </div>
    </motion.div>
  );
};
export default Courses;
