import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {profileAction} from "../../store/profileSlice"
import ProfileDashboard from "./ProfileDashboard";
import { IoIosArrowForward } from "react-icons/io";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
const Dashboard = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const{sidebarShow:show}=useSelector((store)=>store.profile)
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  
  return (
    <div className="text-white flex fixed top-0  left-0  w-screen bg-gradient-to-br from-[#000435] via-gray-950/100 to-black pt-[70px] md:pt-[84px] min-h-[calc(100vh-(85px))] ">
      <Sidebar data={show} />

      <div className="w-full   h-screen scrollbar-hidden md:w-[85%]">

        
        <div
          style={{ overflow: "auto" }}
          className=" relative overflow-y-auto scroll-smooth   h-screen"
        >
          <Outlet />
          
        <div onClick={(e)=>{
          dispatch(profileAction.setSidebarShow(!show))
          
          }} 
          className={`${show?"bg-black/50":"hidden"}  w-full h-full fixed top-0 right-0 pt-5  `} />
        <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }} onClick={(e)=>{dispatch(profileAction.setSidebarShow(!show))}} className={` bg-[#333] md:hidden   rounded-full p-2 text-end w-fit fixed bottom-[5rem] right-0 mr-[1.3rem]`}><IoIosArrowForward className="text-3xl "/></motion.div>
        </div>
        
      </div>
    </div>
  );
};
export default Dashboard;
