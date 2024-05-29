import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import ProfileDashboard from "./ProfileDashboard";
import Sidebar from "./Sidebar";
const Dashboard = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="text-white flex fixed top-0 left-0  w-screen bg-gradient-to-br from-[#000435] via-gray-950/100 to-black pt-[84px]  min-h-[calc(100vh-(85px))] ">
      <Sidebar/>
      
      <div className="w-full max-h-[calc(100vh-(85px))] scrollbar-hidden md:w-[85%]">
        <div style={{ overflow: 'auto'}} className=" overflow-y-auto scroll-smooth   max-h-[calc(100vh-85px)]">


        <Outlet/>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
