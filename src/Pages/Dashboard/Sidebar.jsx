import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { Profile } from "../../constants/Profile";
import SidebarLink from "./SidebarLink";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Sidebar = ({data}) => {
  const location = useLocation();
  const { user } = useSelector((store) => store.profile);
  return (
    <div className={` fixed z-[9] md:relative ${data?"":"hidden"} md:flex flex-col  lg:rounded-tl-[2.5rem] overflow-hidden min-h-[calc(100vh-(70px))]  md:min-h-[calc(100vh-(84px))]  min-w-[15%] ${data?"bg-gradient-to-br":"bg-gray-500/20"}  from-[#000435] via-gray-950/100 to-black`}>
      <div
        className="flex flex-col font-semibold text-blue-1
        00 lg:text-lg "
      >
        {Profile.map((item) => {
          if (item.role && user?.role !== item.role) return null;
          return (
            <SidebarLink
              key={item.id}
              icon={item.icon}
              link={item.url}
              name={item.title}
            />
          );
        })}
        <div className="my-4 h-[2px] rounded-full w-[85%] bg-gray-400/10 mx-auto " />

        <SidebarLink
          link={"/dashboard/settings"}
          name={"Settings"}
          icon={CiSettings}
        />
        <SidebarLink link={""} name={"Log out"} icon={CiLogout} />
      </div>
    </div>
  );
};
export default Sidebar;
