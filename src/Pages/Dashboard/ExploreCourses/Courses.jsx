import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../../APIs/mainAPI";
import { courseAction } from "../../../store/courseSlice";
import ExploreCoursesCard from "./ExploreCoursesCard";
import { encryptData } from "../../../components/core/auth/crypto";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import CourseSwitch from "./CourseSwitch";
const Courses = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const { expC } = useParams();
  const dispatch = useDispatch();
  const { exploreAllCourses } = useSelector((store) => store.course);
  const { user } = useSelector((store) => store.profile);
  const [course, setCourses] = useState(exploreAllCourses);
useEffect(()=>{
  if(user?.role!=="Instructor")
  toast('You can buy these courses without spending real money', {
    style: {
      textAlign: 'center'
    }
  });
},[])
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      
      const controller = new AbortController();
      const signal = controller.signal;
      const fetchData = async () => {
        try {
          const courseData = await getAllCourse(signal);
          const text = encryptData(courseData);
          localStorage.setItem(import.meta.env.VITE_ALL_C, text);
          dispatch(courseAction.setExploreAllCourses(courseData));
        } catch (error) {
          if (!controller.signal.aborted) {
            toast.error("Unable to fetch all courses");
          }
        }
      };

      if (!course) {
        fetchData();
      }
      return () => {
        controller.abort();
      };
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
      <Link to={"/"} className="underline active:text-white  sm:hover:text-white ">Home</Link>
        <span>/</span>
        <Link to={"/dashboard/my-profile"} className="underline active:text-white  sm:hover:text-white " >Dashboard</Link>
        <span>/</span>
        <span className="text-yellow-500  whitespace-nowrap">
          {" "}
          {user?.role === "Instructor" ? "All Courses" : "Explore Courses"}
        </span>
      </div>
      <h1 className="text-3xl mb-3 py-1 whitespace-nowrap overflow-x-auto mr-5">
        {" "}
        {user?.role === "Instructor" ? "All Courses" : "Explore Courses"}{" "}
        {user?.role === "Instructor" && (
          <span className=" text-[1.3rem] text-white/50">
            (To enroll in a course, please switch to the Student role)
          </span>
        )}{" "}
      </h1>
      <div className="flex mr-5 rounded-lg overflow-x-auto items-center justify-start ">
        <CourseSwitch roll={expC} />
      </div>

      <div className="overflow-y-auto   mt-2 rounded-md pb-[12rem] h-[75vh]">
        {!course ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : course.length ? (
          course.map(
            (courseItem, index) =>
              courseItem.status == "Published" &&
              courseItem.Catagory.titleCourse === expC && (
                <ExploreCoursesCard course={courseItem} key={index} />
              )
          )
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
