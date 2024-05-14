
import { FaHandPointRight } from "react-icons/fa";
import Button from "../../components/Homepage/Button";
import techimage from "../../assets/tech.png";
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
      delay:.12,
      duration:.9
    }
  })
}
const SkillSection = () => {
    return (
        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{
            once:true
          }}  className="relative container mt-[4rem] mx-auto px-[1rem] flex flex-col  gap-7  lg:px-[4rem] md:flex-row">
            <div className=" z-10 0  flex flex-col  mx-auto sm:text-start max-w-[30em]  ">
                <h1 className=" text-3xl lg:text-5xl text-center font-bold mb-4 md:mb-10 ">AI Chat App for seamless collaboration</h1>
                <ul className=" text-xl lg:text-2xl mx-auto  sm:text-start mb-11 md:mb-[5rem] max-w-[20rem]">
                    <li className="mb-3   text-center">
                        <div className="flex justify-center   items-center mb-2 gap-5">
                            <FaHandPointRight className="text-purple-500"/>
                            <h6>Seamless Integration</h6>
                        </div>
                        <p className="text-sm text-gray-300/50">With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.</p>
                    </li>
                    <li className="mb-3 ">
                        <div className="flex justify-center items-center mb-2 gap-5">
                            <FaHandPointRight className="text-purple-500"/>
                            <h6>Smart Automation</h6>
                        </div>
                    </li>
                    <li className="mb-3 ">
                        <div className="flex justify-center items-center mb-2 gap-5">
                            <FaHandPointRight className="text-purple-500"/>
                            <h6>Top-notch Security</h6>
                        </div>
                    </li>
                    
                </ul>
                <Button className={"outline-none rounded-md mx-auto text-yellow-950  bg-yellow-500 py-3 px-5 font-semibold"} > Learn More</Button>
            </div>
            
            <div className=" overflow-hidden hidden md:flex relative rounded-3xl ">
                <img src={techimage} loading="lazy" className="rounded-md opacity-80  absolute lg:static top-0 left-0 object-cover " alt="" />
                <div className="h-full w-full  absolute top-0 left-0 bg-gradient-to-br from-blue-950/40 to-transparent"></div>
            </div>
        </motion.div>
    );
}
export default SkillSection

