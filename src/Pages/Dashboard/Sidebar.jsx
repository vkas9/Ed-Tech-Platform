import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { Profile } from "../../constants/Profile";
import SidebarLink from "./SidebarLink";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const Sidebar = ({data}) => {
  const { user } = useSelector((store) => store.profile);
  return (
    <motion.div
    initial={{ opacity: 0, x: -70 }}
    animate={data ? { opacity: 1, x: 0 } : null} 
    transition={{ duration: 0.1, delay: 0.2, ease: [0, 0.21, 0.2, 1.01] }} className={` fixed z-[9] md:relative ${data?"":"hidden"} md:flex flex-col  lg:rounded-tl-[2.5rem] overflow-hidden min-h-[calc(100vh-(70px))]  md:min-h-[calc(100vh-(84px))]  min-w-[15%] ${data?"bg-gradient-to-br":"bg-gray-500/20"}  from-[#000435] via-gray-950/100 to-black`}>
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
    </motion.div>
  );
};
export default Sidebar;
