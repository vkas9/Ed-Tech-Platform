import Navbar from "../../components/Homepage/Navbar";
import { DiRedis } from "react-icons/di";

import { IoLogoNodejs } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";
import { SiTailwindcss } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { IoLogoAngular } from "react-icons/io5";
import Hero from "./hero";
import ballon from "../../assets/baloon.png";

const Home = () => {
  return (
    <div className=" overflow-hidden bg-gradient-to-br from-blue-950 via-gray-950/100 to-black ">  
      {/* section 1 */}
      <Navbar />
      <Hero />
      <div className=" relative flex text-center  flex-col gap-[4rem] mt-[8rem] lg:mt-[10em] items-center">
        <p className="tracking-[5px] font-sans text-gray-400 select-none font-bold text-md">
          HELPING PEOPLE CREATE BEAUTIFUL CONTENT AT
        </p>
        <div className="flex item-center  flex-wrap flex-row gap-10 md:gap-20 justify-center  mb-5 relative text-6xl max-w-[900px]">
          <IoLogoNodejs className="hover:scale-125 hover:text-[#80B307] transition-all duration-300" />
          <FaReact className="hover:scale-125 hover:text-[#5CC5E1] transition-all duration-300" />
          <SiTailwindcss className="hover:scale-125 hover:text-[#32AADF] transition-all duration-300" />
          <SiMongodb className="hover:scale-125 hover:text-[#4C9B40] transition-all duration-300" />
          <IoLogoAngular className="hover:scale-125 hover:text-[#C0002A] transition-all duration-300" />
          <DiRedis className="hover:scale-125 hover:text-[#d13530] transition-all duration-300" />
        </div>
        
      </div>
    </div>
  );
};
export default Home;
