import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../Auth/Authapi";

import SidebarLink from "./SidebarLink";
import { Profile } from "../../constants/Profile";
const Dashboard = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="text-white relative top-[68px]  min-h-[calc(100vh-(68px))] ">
      <div className="top-[68px]  min-h-[calc(100vh-(68px))]  w-[15rem] bg-gray-500/20 ">
        <div className="flex flex-col font-semibold lg:text-lg ">
          {Profile.map((item, index) => (
            <SidebarLink key={item.id} icon={item.icon} link={item.url} name={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
