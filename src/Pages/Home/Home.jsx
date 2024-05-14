
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
import Footer from "../../components/Homepage/Footer";
import { motion } from "framer-motion";
const fadeIn={
  initial:{
    opacity:0,
    y:50
  },
  animate:(index)=>({
    opacity:1,
    y:0,
    
    transition:{
      delay:.12*index,
      duration:.9
    }
  })
}
const List=[
  {
    tag:IoLogoNodejs,
    className:"active:scale-125 active:text-[#80B307] md:hover:scale-125 md:hover:text-[#80B307] transition-all duration-300"
  }
  ,{
    tag:FaReact,
    className:"active:scale-125 active:text-[#5CC5E1] md:hover:scale-125 md:hover:text-[#5CC5E1] transition-all duration-300"
  }
  ,{
    tag:SiTailwindcss,
    className:"active:scale-125 active:text-[#32AADF] md:hover:scale-125 md:hover:text-[#32AADF] transition-all duration-300"
  },{
    tag:SiMongodb,
    className:"active:scale-125 active:text-[#4C9B40] md:hover:scale-125 md:hover:text-[#4C9B40] transition-all duration-300"
  },{
    tag:IoLogoAngular,
    className:"active:scale-125 active:text-[#C0002A] md:hover:scale-125 md:hover:text-[#C0002A] transition-all duration-300"
  },{
    tag:DiRedis,
    className:"active:scale-125 active:text-[#d13530] md:hover:scale-125 md:hover:text-[#d13530] transition-all duration-300"
  },

]

const Home = () => {
  return (
    <div className=" overflow-hidden  ">
      <Hero />
      <div className=" relative flex text-center  flex-col gap-[4rem] mt-[8rem] lg:mt-[2em] items-center">
        <p className="tracking-[5px] font-sans uppercase bg-gradient-to-br   md:bg-gradient-to-b from-white via-white to-black/40 bg-clip-text text-transparent select-none font-bold text-lg">
          Learn new skills. Prove your potential.
        </p>
        <div className="flex item-center  flex-wrap flex-row gap-10 md:gap-20 justify-center  mb-5 relative  text-6xl lg:text-8xl max-w-[1200px]">
            {
              List.map((value,index)=>(
                <motion.div key={index} variants={fadeIn} initial="initial" whileInView="animate" viewport={{
                  once:true
                }} custom={index}>

                
                <value.tag  key={index} className={value.className} />
                </motion.div>
              ))
            }
        </div>
      </div>
      <CodeBlocks />
      <SkillSection/>
      <Pricing/>
      <AboutUs/>
      <Footer />
    </div>
  );
};
export default Home;
