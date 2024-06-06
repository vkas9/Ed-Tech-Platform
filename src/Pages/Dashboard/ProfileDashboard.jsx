import { MdOutlineEdit } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../../store/profileSlice";
const ProfileDashboard = () => {
 
  const dispatch=useDispatch()
  const {user} =  useSelector((store) => store.profile);
  dispatch(profileAction.setProfile(user))

  if(user) return (

    <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0}} transition={{duration:.4,delay:.2,ease:[0,.71,.2,1.01]}} className="w-full">
      <div className=" text-lg flex flex-col gap-4 mt-2 ml-5 ">
        <div className="flex text-white/50  overflow-x-auto font-semibold gap-2 ">
          <span>Home</span>
          <span>/</span>
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-yellow-500 ">Profile</span>
        </div >

        <h1 className="text-[2.5rem] font-semibold ">My Profile</h1>
      </div>
      <div className="mt-8  px-3 sm:px-0  ">
        <div className=" p-4 flex flex-col sm:flex-row items-center  bg-white/10 rounded-md py-6 gap-1 w-full sm:w-[95%] lg:max-w-[55rem] sm:ml-5">
          <div className="min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px]   ">
            <img  src={user.avatar} className="" alt="" />
          </div>
          <div className="flex  flex-col sm:flex-row text-center sm:text-start ml-3 w-full justify-between ">
            <div className="flex flex-col ">
              <span className="capitalize overflow-x-auto ">
                {user.FirstName} {user.LastName}
              </span>
              <span className="text-gray-200/50 overflow-x-auto ">{user.Email}</span>
            </div>
            <Link to="/dashboard/settings">
            <div className="sm:flex select-none text-xl gap-2 items-center p-2 border hidden  active:bg-gray-100/10 lg:hover:bg-gray-100/10 hover:cursor-pointer border-gray-400/50 rounded-lg font-semibold ">
              <MdOutlineEdit className="text-lg" />
              <span>Edit</span>
            </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 px-3 sm:px-0">
        <div className=" p-4 flex mb-[4rem] flex-col items-center  bg-white/10 rounded-md pt-2 pb-6 gap-9 sm:w-[95%] w-full  lg:max-w-[55rem] sm:ml-5 ">
          <div className="flex mt-2 overflow-x-auto items-center mx-3 w-full justify-between  ">
            <div className="flex text-2xl font-semibold flex-col ">
              <span className="overflow-x-auto ">Personal Details</span>
            </div>
            <Link to="/dashboard/settings">

            <div className="flex text-xl select-none gap-2 items-center p-2 border active:bg-gray-100/10 lg:hover:bg-gray-100/10 hover:cursor-pointer border-gray-400/50 rounded-lg font-semibold ">
              <MdOutlineEdit className="text-lg" />
              <span>Edit</span>
            </div>
            </Link>
          </div>
          <div className="  w-full bg-gray-500/10  flex-col sm:flex-row p-4 py-6 rounded-xl  mx-3 flex justify-between  gap-3">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col ">
                <span className="text-gray-400 overflow-x-auto">First Name</span>
                <span className="capitalize overflow-x-auto">{user.FirstName}</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-gray-400 overflow-x-auto">Last Name</span>
                <span className="capitalize overflow-x-auto ">{user.LastName}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex  flex-col ">
                <span className="text-gray-400 overflow-x-auto">Email</span>
                <span className="overflow-x-auto ">{user.Email}</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-gray-400 overflow-x-auto">Phone Number</span>
                <span className="overflow-x-auto">{user.Contact_Number}</span>
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
