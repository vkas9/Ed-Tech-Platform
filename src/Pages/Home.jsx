import HightlightText from "../components/Homepage/HightlightText";
import Navbar from "../components/Homepage/Navbar";
import curve1 from "../assets/curve1.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../components/Homepage/Button";
import video from "../assets/video.mp4";
import { IoLogoNodejs } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";
import { SiTailwindcss } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { IoLogoAngular } from "react-icons/io5";


const Home = () => {
  return (
    <div className="">
      {/* section 1 */}
      <Navbar />
      <div className=" container relative w-full mt-[72px] min-h-[4000px] mx-auto text-center   ">
        <div className="  mx-auto  pt-9 flex flex-col px-9 overflow-hidden relative z-10 gap-[4rem]  ">
          <h1 className="text-4xl lg:text-7xl font-bold  ">
            Empower Your Future with{" "}
            <HightlightText
              className={
                "bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text relative  "
              }
            >
              Coding Skills{" "}
              <img
                src={curve1}
                className=" absolute left-0 top-full lg:mt-1 "
                width="624"
              />{" "}
            </HightlightText>
          </h1>
          <p className="max-w-[800px] mx-auto font-mono  px-3  font-semibold lg:text-lg  ">
          Unleash the power of AI within Brainwave. Upgrade your productivity with Brainwave, the open AI chat app.{" "}
          </p>
          <Link to={"/signup"}>
            <div className=" shadow-inner shadow-black group font-bold  hover:scale-105 transition-all duration-200 mx-auto bg-gray-800/70 rounded-md w-fit ">
              <div className="flex gap-4 hover:scale-105 transition-all duration-200 items-center rounded-md px-5 py-3 ">
                <p>Become an Instructor</p>
                <FaArrowRight size={20} />
              </div>
            </div>
          </Link>
          <div className="flex flex-col mx-auto sm:flex-row gap-5 ">
            <Button
              link={"/signup"}
              className={
                " outline-none shadow-inner  shadow-black hover-none text-black bg-yellow-500 py-3 "
              }
            >
              Learn More
            </Button>
            <Button
              link={"/signup"}
              className={
                " outline-none bg-gray-800 shadow-inner  shadow-white  py-3"
              }
            >
              Book a Demo
            </Button>
          </div>
        </div>
        
        <div className=" rounded-xl lg:max-h-[800px] z-2  overflow-hidden absolute right-0 top-0 ">
          <video
            src={video}
            muted
            loop
            autoPlay
            className="opacity-30 "
          ></video>
        </div>
        <div className="hidden md:flex flex-col overflow-hidden gap-[6rem] mt-[26em] items-center  ">
          <p className="tracking-widest font-sans text-gray-400 font-bold text-md">HELPING PEOPLE CREATE BEAUTIFUL CONTENT AT</p>
          <div className="flex item-center justify-between   text-6xl min-w-[900px]  ">
              <IoLogoNodejs/>
              <FaReact/>
              <SiTailwindcss/>
              <SiMongodb/>
              <IoLogoAngular/>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Home;
