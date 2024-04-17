import { MdOutlineEdit } from "react-icons/md";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
const ProfileDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  if(user) return (

    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4,delay:.2,ease:[0,.71,.2,1.01]}} className="w-[85%]">
      <div className=" text-lg flex flex-col gap-4 mt-2 ml-5 ">
        <div className="flex font-semibold gap-2 ">
          <span>Home</span>
          <span>/</span>
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-yellow-500 ">Profile</span>
        </div >

        <h1 className="text-[2.5rem] font-semibold ">My Profile</h1>
      </div>
      <div className="mt-8  ">
        <div className=" p-2 flex items-center  bg-gray-500/30 rounded-md py-6 gap-1 max-w-[55%] ml-5">
          <div className="min-h-[70px] min-w-[70px]  rounded-full ">
            <img src={user.ProfilePicture} className="rounded-full" alt="" />
          </div>
          <div className="flex items-center ml-3 w-full justify-between ">
            <div className="flex flex-col ">
              <span>
                {user.FirstName} {user.LastName}
              </span>
              <span className="text-gray-200/50 ">{user.Email}</span>
            </div>
            <div className="flex text-xl gap-2 items-center p-2 border hover:bg-gray-100/10 hover:cursor-pointer border-gray-400/50 rounded-lg font-semibold ">
              <MdOutlineEdit className="text-lg" />
              <span>Edit</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8  ">
        <div className=" p-4 flex flex-col items-center  bg-gray-500/30 rounded-md pt-2 pb-6 gap-9 max-w-[55%] ml-5">
          <div className="flex mt-2 items-center mx-3 w-full justify-between  ">
            <div className="flex text-2xl font-semibold flex-col ">
              <span>Personal Details</span>
            </div>
            <div className="flex text-xl gap-2 items-center p-2 border hover:bg-gray-100/10 hover:cursor-pointer border-gray-400/50 rounded-lg font-semibold ">
              <MdOutlineEdit className="text-lg" />
              <span>Edit</span>
            </div>
          </div>
          <div className=" w-full bg-gray-700/20 p-4 py-6 rounded-xl  mx-3 flex justify-between  gap-3">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col ">
                <span className="text-gray-400">First Name</span>
                <span>{user.FirstName}</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-gray-400">Email</span>
                <span>{user.Email}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex  flex-col ">
                <span className="text-gray-400">Last Name</span>
                <span>{user.LastName}</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-gray-400">Phone Number</span>
                <span>{user.Contact_Number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
  else return <Navigate to="/login"/>
};
export default ProfileDashboard;
