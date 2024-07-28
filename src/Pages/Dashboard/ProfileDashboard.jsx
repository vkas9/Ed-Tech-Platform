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

    <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0}} transition={{duration:.4,delay:.2,ease:[0,.71,.2,1.01]}} className="w-full overflow-y-auto max-h-[calc(100vh-5.5rem)]  scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full pb-[8rem]">
      <div className=" text-lg flex flex-col gap-4 mt-2 ml-5 ">
        <div className="flex text-white/50  overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full font-semibold gap-2 ">
        <Link to={"/"} className="underline active:text-white  sm:hover:text-white ">Home</Link>
          <span>/</span>
          <Link to={"/dashboard/my-profile"} className="underline active:text-white  sm:hover:text-white " >Dashboard</Link>
          <span>/</span>
          <span className="text-yellow-500 ">Profile</span>
        </div >

        <h1 className="text-[2.5rem] font-semibold ">My Profile</h1>
      </div>
      <div className="mt-8  px-3 sm:px-0  ">
        <div className=" p-4 flex flex-col sm:flex-row items-center relative  bg-black/20 rounded-md py-6 gap-1 w-full sm:w-[95%] lg:max-w-[55rem] sm:ml-5">
        <div className="absolute w-full h-full sm:bg-gradient-to-r -z-[1] from-black via-transparent to-transparent  left-0 top-0 " ></div>
        <div class="absolute bg-right bg-cover inset-1 h-full w-full top-0 left-0 rounded-md opacity-20 sm:opacity-35  -z-[2] " style={{backgroundImage:`url(${user?.avatar})`}}></div>
          <div className="min-h-[120px] min-w-[120px] max-h-[120px] sm:min-h-[100px] sm:min-w-[100px] sm:max-h-[100px] sm:max-w-[100px] max-w-[120px] rounded-full overflow-hidden    ">
            <img  src={user?.avatar} className="overflow-auto pointer-events-none scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-full min-h-[120px] min-w-[120px] max-h-[120px] sm:min-h-[100px] sm:min-w-[100px] sm:max-h-[100px] sm:max-w-[100px] max-w-[120px] object-cover" alt="" />
          </div>
          <div className="flex  flex-col sm:flex-row text-center sm:text-start ml-3 w-full justify-between ">
            <div className="flex flex-col ">
              <span className="capitalize overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
                {user.FirstName} {user.LastName}
              </span>
              <span className="text-gray-200/50 overflow-x-auto  scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">{user.Email}</span>
            </div>
            <Link to="/dashboard/settings">
            <div className="sm:flex select-none text-xl gap-2 items-center p-2 border hidden bg-black/30  active:bg-black/40 lg:hover:bg-black/40 hover:cursor-pointer border-gray-400/50 rounded-lg font-semibold ">
              <MdOutlineEdit className="text-lg" />
              <span>Edit</span>
            </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 px-3 sm:px-0">
        <div className=" p-4 flex mb-[4rem] flex-col items-center  bg-white/10 rounded-md pt-2 pb-6 gap-9 sm:w-[95%] w-full  lg:max-w-[55rem] sm:ml-5 ">
          <div className="flex mt-2 overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full items-center mx-3 w-full justify-between  ">
            <div className="flex text-2xl font-semibold flex-col ">
              <span className="overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">Personal Details</span>
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
                <span className="text-gray-400 overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">First Name</span>
                <span className="capitalize overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">{user.FirstName}</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-gray-400 overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">Last Name</span>
                <span className="capitalize overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">{user.LastName}</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-gray-400 overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">Gender</span>
                <span className="capitalize overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">{user.Profile.gender?user.Profile.gender:"NIL"}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex  flex-col ">
                <span className="text-gray-400 overflow-x-auto  scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">Email</span>
                <span className="overflow-x-auto  scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">{user.Email}</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-gray-400 overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">Phone Number</span>
                <span className="overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">{user?.Profile?.contactNumber || user.Contact_Number}</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-gray-400 overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">Date Of Birth</span>
                <span className="capitalize overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">{user.Profile.dateOfBirth?user.Profile.dateOfBirth.slice(0,10):"NIL"}</span>
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
