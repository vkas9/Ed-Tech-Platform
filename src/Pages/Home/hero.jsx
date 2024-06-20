import curve1 from "../../assets/curve1.png";
import g2 from "../../assets/g2.png";
import ud from "../../assets/UD.png";

import HightlightText from "../../components/Homepage/HightlightText";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../../components/Homepage/Button";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
//
const hero = () => {
  const { user } = useSelector((store) => store.profile);
  
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6,delay:.2,ease:[0,.71,.2,1.01]}} className=" mx-auto  relative lg:h-[calc(100vh-68px)]  md:pt-[15vh] text-center flex mt-[84px]   lg:min-h-[55em]  ">
     <div className="  mx-auto h-fit  flex flex-col px-[1px] md:px-8  mt-[calc(6rem-68px)]    z-10 gap-[3rem] lg:gap-[4rem] ">
        <h1 className="text-[35px] bn:text-[40px] px-2 vm:text-[45px] relative md:text-6xl  lg:text-7xl font-bold mx-auto max-w-[57rem]  ">
        Unlock Your Potential with{" "}
          <HightlightText
            className={
              "bg-gradient-to-r from-red-500 via-purple-400 to-blue-500  text-transparent bg-clip-text relative  "
            }

          >
              <span className="xs:whitespace-nowrap">Power of Coding</span>
            <img
              
              src={curve1}
              className=" absolute left-0 top-full lg:mt-1 "
              width="624"
            />{" "}
          </HightlightText>

          <div className="max-w-[600px] lg:hidden  opacity-100 absolute top-0 right-0  -z-[100] h-[220px]   rounded-full blur-xl "><img src={ud} alt="" /></div>
          <div className="max-w-[600px] lg:hidden  opacity-20 absolute top-0 right-0  -z-[100] h-[220px]   rounded-full blur-2xl "><img src={g2} alt="" /></div>
        </h1>
        <p className="max-w-[3xl] mx-auto  text-sm text-gray-400  px-3  font-semibold lg:text-lg  ">
        Upgrade your Coding Skills with MASTER Today for Success.{" "}
        </p>
        <Link to={"/login"} className=" mx-auto">
          <div className="   group font-bold  hover:scale-105 transition-all duration-200 mx-auto bg-white/10 backdrop-blur-sm rounded-md w-fit ">
            <div className="flex gap-4 hover:scale-105 transition-all duration-200 items-center rounded-md px-5 py-3 ">
              {user?.role==="Instructor"? <Link to={"/dashboard/my-profile"}>Go To Dashboard</Link>:<Link to={"/login"} >Teach on MASTER</Link> }
              <FaArrowRight size={20}  className="animate-pulse "/>
            </div>
          </div>
        </Link>
        <div className="flex py-1 select-none flex-col mx-auto sm:flex-row gap-5 ">
          <Link
            to={"/signup/i/student"}
            className={
              " outline-none rounded-md text-[1.2rem]  font-bold  hover-none text-[#0b2442] md:hover:bg-[#34b7eb] py-2 sm:px-3 bg-gradient-to-br from-[#13498a]  to-[#34b7eb]  "
            }
          >
            Learn More
          </Link>
          <Link
            to={"/dashboard/courses/cloud-computing"}
            className={
              " outline-none text-[1.2rem] font-semibold rounded-md bg-white/10 backdrop-blur-sm hover:shadow-inner transition-all duration-400  py-2 px-2 sm:px-3"
            }
          >
            Explore Courses
          </Link>
        </div>
      </div>

      <div className=" hidden  w-full   lg:flex   items-center rounded-t-[3rem] overflow-hidden mx-auto absolute bottom-0 top-0 ">
        <video
          src={`https://res.cloudinary.com/dwtcqxkxt/video/upload/v1717518684/VikasFolder/video_mmswrj.mp4`}
          preload="auto"
          muted
          loop
          autoPlay
          className="opacity-30 min-w-full min-h-full object-cover  "
          type="mp4"
        ></video>
      </div>
    </motion.div>
  );
};
export default hero;
