
import { DiRedis } from "react-icons/di";

import { IoLogoNodejs } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";
import { SiTailwindcss } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { IoLogoAngular } from "react-icons/io5";
import Hero from "./hero";
import CodeBlocks from "./CodeBlocks";
import SkillSection from "./SkillSection";
import Pricing from "./Pricing"
import AboutUs from "./AboutUs";


const Home = () => {
  return (
    <div className=" overflow-hidden  ">
      {/* section 1 */}
      {/* <Navbar /> */}
      <Hero />
      <div className=" relative flex text-center  flex-col gap-[4rem] mt-[8rem] lg:mt-[6em] items-center">
        <p className="tracking-[5px] font-sans uppercase text-gray-400 select-none font-bold text-lg">
          Learn new skills. Prove your potential.
        </p>
        <div className="flex item-center  flex-wrap flex-row gap-10 md:gap-20 justify-center  mb-5 relative  text-6xl lg:text-8xl max-w-[1200px]">
          <IoLogoNodejs className="active:scale-125 active:text-[#80B307] md:hover:scale-125 md:hover:text-[#80B307] transition-all duration-300" />
          <FaReact className="active:scale-125 active:text-[#5CC5E1] md:hover:scale-125 md:hover:text-[#5CC5E1] transition-all duration-300" />
          <SiTailwindcss className="active:scale-125 active:text-[#32AADF] md:hover:scale-125 md:hover:text-[#32AADF] transition-all duration-300" />
          <SiMongodb className="active:scale-125 active:text-[#4C9B40] md:hover:scale-125 md:hover:text-[#4C9B40] transition-all duration-300" />
          <IoLogoAngular className="active:scale-125 active:text-[#C0002A] md:hover:scale-125 md:hover:text-[#C0002A] transition-all duration-300" />
          <DiRedis className="active:scale-125 active:text-[#d13530] md:hover:scale-125 md:hover:text-[#d13530] transition-all duration-300" />
        </div>
      </div>
      <CodeBlocks />
      <SkillSection/>
      <Pricing/>
      <AboutUs/>
    </div>
  );
};
export default Home;
