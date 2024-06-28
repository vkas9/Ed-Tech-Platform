import { FaHandPointRight } from "react-icons/fa";
import Button from "../../components/Homepage/Button";
import techimage from "../../assets/tech.webp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const fadeIn = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: 0.12,
      duration: 0.9,
    },
  }),
};
const InfoSection = () => {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
      }}
      className="relative container mt-[4rem] mx-auto px-[1rem] flex flex-col  gap-7  lg:px-[4rem] md:flex-row"
    >
      <div className=" z-10 0  flex flex-col  mx-auto sm:text-start max-w-[30em]  ">
        <h1 className=" text-3xl lg:text-5xl text-center font-bold mb-4 md:mb-10 ">
          MASTER for Mastering New Technologies
        </h1>
        <ul className=" text-xl lg:text-2xl font-semibold flex flex-col items-start  mx-auto  sm:text-start mb-11 md:mb-[5rem] max-w-[24rem]">
          <li className="mb-3   text-center">
            <div className="flex justify-center   items-center mb-2 gap-5">
              <FaHandPointRight className="text-[#34d2eb]" />
              <h6>Comprehensive Curriculum</h6>
            </div>
            {/* <p className="text-sm text-gray-300/50">With interactive courses and cutting-edge security, it's the perfect solution for aspiring developers aiming to excel in programming.</p> */}
          </li>
          <li className="mb-3 ">
            <div className="flex justify-center items-center mb-2 gap-5">
              <FaHandPointRight className="text-[#34d2eb]" />
              <h6>Interactive Courses</h6>
            </div>
          </li>
          <li className="mb-3 ">
            <div className="flex justify-center items-center mb-2 gap-5">
              <FaHandPointRight className="text-[#34d2eb]" />
              <h6>Cutting-Edge Security</h6>
            </div>
          </li>
        </ul>
        <div
          className={
            "outline-none text-2xl rounded-md mx-auto text-[#0b2442]   bg-gradient-to-br from-[#13498a]  to-[#34b7eb]   py-2 px-4  hover:cursor-pointer font-bold"
          }
        >
          <Link to="/signup/i/student"> Learn More</Link>
        </div>
      </div>

      <div className=" overflow-hidden hidden md:flex relative rounded-3xl ">
        <img
          src={techimage}
          className="rounded-md opacity-80  absolute lg:static top-0 left-0 object-cover "
          alt=""
        />
        <div className="h-full w-full  absolute top-0 left-0 bg-gradient-to-br from-blue-950/40 to-transparent"></div>
      </div>
    </motion.div>
  );
};
export default InfoSection;
