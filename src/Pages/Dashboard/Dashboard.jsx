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
    <div className="text-white flex relative  pt-[84px]  min-h-[calc(100vh-(85px))] ">
      <Sidebar/>
      
      <div className="w-full max-h-[calc(100vh-(85px))] scrollbar-hidden md:w-[85%]">
        <div style={{ overflow: 'auto', '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }} className=" overflow-y-auto scroll-smooth   max-h-[calc(100vh-85px)]">


        <Outlet/>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
