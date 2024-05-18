import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCourseDetail } from "../../../Auth/Authapi";
import  CryptoJS  from "crypto-js";
import WishlistCard from "./WishlistCard";

const Wishlist = () => {
  const[enrolledCourses,setEnrolledCourses]= useState(null);
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const data = JSON.parse(localStorage.getItem("user"));
        console.log("data",data)
      if (data && data.Courses && data.Courses.length > 0) {
        const courseData = await getCourseDetail(data.Courses);
        setEnrolledCourses(courseData.data.courseDetail);
      }
      else{
        setEnrolledCourses([])
      } 
      
      }catch(error){
        console.log("Unable to fetch enrolled courses")
      }
    };
    if(localStorage.getItem("EC")){
      var bytes  = CryptoJS.AES.decrypt(localStorage.getItem("EC"), "EDVKAS9"); 
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setEnrolledCourses(JSON.parse(decryptedData));
    }else{
      fetchData();
    }
  
    
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg  pt-2 pl-5 "
    >
      <div className="flex gap-1 text-white/50  overflow-x-auto items-center ">
        <span>Home</span>
        <span>/</span>
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-yellow-500 ">Wishlist</span>
      </div>

      <h1 className=" text-3xl">My Wishlist</h1>
      <div className="overflow-auto  h-[78vh] ">
      {
        !enrolledCourses?(
          <div>
            <p>Loading...</p>
          </div>
        ):enrolledCourses.length?enrolledCourses.map((course,index)=>(
          <WishlistCard  course={course} key={index}/>
       ))     
       :<p className="relative text-center mr-3 top-1/3 sm:top-1/2 sm:left-[35%] text-2xl font-semibold sm:w-fit text-white/40  " >Your wishlist is empty!</p>
        
      }
       </div>

    </motion.div>
  );
};
export default Wishlist;
