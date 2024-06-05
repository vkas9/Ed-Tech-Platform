import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {profileAction} from "../../store/profileSlice"
import ProfileDashboard from "./ProfileDashboard";
import { IoIosArrowForward } from "react-icons/io";

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
          
        <div onClick={(e)=>{dispatch(profileAction.setSidebarShow(!show))}}className={`${show?"bg-black/50":"hidden"}  w-full h-full absolute top-0 right-0 pt-5  `} />
        <div onClick={(e)=>{dispatch(profileAction.setSidebarShow(!show))}} className={` bg-white/10 md:hidden   rounded-full p-2 text-end w-fit absolute right-0 top-11 mr-5`}><IoIosArrowForward className="text-3xl "/></div>
        </div>
        
      </div>
    </div>
  );
};
export default Dashboard;
