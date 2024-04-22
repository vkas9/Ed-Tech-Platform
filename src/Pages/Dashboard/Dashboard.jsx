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
    <div className="text-white flex relative top-0 pt-[68px]  min-h-[calc(100vh-(68px))] ">
      <Sidebar/>
      
      <div className="w-full md:w-[85%]">
        <Outlet/>
      </div>
    </div>
  );
};
export default Dashboard;
