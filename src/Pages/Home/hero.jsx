import curve1 from "../../assets/curve1.png";
import g2 from "../../assets/g2.png";
import ud from "../../assets/UD.png";
import video from "../../assets/video.mp4";
import HightlightText from "../../components/Homepage/HightlightText";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../../components/Homepage/Button";


const hero = () => {
  return (
    <div className=" mx-auto relative text-center flex   lg:min-h-[55em]  ">
      <div className="  mx-auto  max-w-[85rem]  flex flex-col px-[1px] md:px-8 mt-[6rem] lg:mt-[14rem]   relative z-10 gap-[3rem] lg:gap-[4rem] ">
        <h1 className="text-[45px] relative md:text-6xl  lg:text-7xl font-bold mx-auto max-w-[57rem]  ">
          Empower Your Future with{" "}
          <HightlightText
            className={
              "bg-gradient-to-r from-red-500 via-purple-400 to-blue-500  text-transparent bg-clip-text relative  "
            }

          >
            Coding Skills{" "}
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
          Unleash the power of AI within Brainwave. Upgrade your productivity
          with Brainwave, the open AI chat app.{" "}
        </p>
        <Link to={"/signup"} className=" mx-auto">
          <div className="   group font-bold  hover:scale-105 transition-all duration-200 mx-auto bg-gray-800/70 rounded-md w-fit ">
            <div className="flex gap-4 hover:scale-105 transition-all duration-200 items-center rounded-md px-5 py-3 ">
              <p>Teach on MASTER</p>
              <FaArrowRight size={20}  className="animate-pulse "/>
            </div>
          </div>
        </Link>
        <div className="flex  select-none flex-col mx-auto sm:flex-row gap-5 ">
          <Button
            link={"/signup"}
            className={
              " outline-none  font-semibold hover-none text-black bg-yellow-500 py-3 "
            }
          >
            Learn More
          </Button>
          <Button
            link={"/signup"}
            className={
              " outline-none   bg-gray-800/80 hover:shadow-inner transition-all duration-400  py-3"
            }
          >
            Book a Demo
          </Button>
        </div>
      </div>

      <div className=" hidden  w-full h-full  lg:flex  items-center rounded-t-[3rem] overflow-hidden mx-auto absolute bottom-0 top-[68px] ">
        <video
          src={video}
          muted
          loop
          autoPlay
          className="opacity-30 w-full min-w-[1800px]  "
          type="mp4"
        ></video>
      </div>
    </div>
  );
};
export default hero;
