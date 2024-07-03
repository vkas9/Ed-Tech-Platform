import { motion } from "framer-motion";
import ResetPassword from "./changePassword";
import EditProfile from "./EditProfile/EditProfile";
import { Link } from "react-router-dom";
const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex pb-[9rem] max-h-[calc(100vh-5.5rem)]  scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full  overflow-y-auto font-semibold  flex-col text-lg  pt-2 pl-5 "
    >
      <div className="flex gap-1 items-center text-white/50  overflow-x-auto ">
      <Link to={"/"} className="underline active:text-white  sm:hover:text-white ">Home</Link>
        <span>/</span>
        <Link to={"/dashboard/my-profile"} className="underline active:text-white  sm:hover:text-white " >Dashboard</Link>
        <span>/</span>
        <span className="text-yellow-500 ">Settings</span>
      </div>
      <EditProfile/>
      <div className="w-[98%] my-6 mt-9  min-h-[.5px] bg-white/20 rounded-full" />
      <ResetPassword/>
    </motion.div>
  );
};
export default Settings;
