import { CiLogout, CiSettings } from "react-icons/ci";
import { Profile } from "../../constants/Profile";
import SidebarLink from "./SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { profileAction } from "../../store/profileSlice";
import { useMediaQuery } from "./useMediaQuery";
import { useEffect } from "react";

const Sidebar = ({ data }) => {
  const { user, sidebarShow: show } = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const isLargeScreen = useMediaQuery(768);

  const commonClasses = `fixed z-[9] md:relative ${data ? "" : "hidden"} md:flex flex-col md:rounded-tl-[2.5rem] overflow-hidden min-h-[calc(100vh-(70px))] md:min-h-[calc(100vh-(84px))] min-w-[15%] ${data ? "bg-gradient-to-br" : "bg-gray-500/20"} from-[#000435] via-gray-950/100 to-black`;

  useEffect(() => {
    if (isLargeScreen && show) {
      dispatch(profileAction.setSidebarShow(false));
    }
  }, [isLargeScreen, show, dispatch]);

  const sidebarContent = (
    <div className="flex flex-col font-semibold text-blue-100 lg:text-lg">
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
      <div className="my-4 h-[2px] rounded-full w-[85%] bg-gray-400/10 mx-auto" />

      <SidebarLink link="/dashboard/settings" name="Settings" icon={CiSettings} />
      <SidebarLink link="" name="Log out" icon={CiLogout} />
    </div>
  );

  return isLargeScreen ? (
    <div className={commonClasses}>
      {sidebarContent}
    </div>
  ) : (
    <motion.div
      initial={{ opacity: 0, x: -70 }}
      animate={data ? { opacity: 1, x: 0 } : null}
      transition={{ duration: 0.1, delay: 0.2, ease: [0, 0.21, 0.2, 1.01] }}
      className={commonClasses}
    >
      {sidebarContent}
    </motion.div>
  );
};

export default Sidebar;
