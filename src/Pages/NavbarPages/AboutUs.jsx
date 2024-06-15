import {motion} from "framer-motion"
import { useEffect } from "react";
const AboutUs = () => {
  useEffect(()=>{
    document.title="About us - MASTER - an EdTech Platform"
  },[])
  return (
    <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }} className="w-screen min-h-screen  flex-col pt-[3rem]   font-semibold text-white/50 flex items-center justify-center ">
       <div className="flex items-center justify-center">
          <h1 className="text-[2.5rem]   w-fit mt-[1rem]  mx-2 md:text-[4rem] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center">
            About Us
          </h1></div>
      <div className=" flex flex-col items-center justify-center ">
        <div className="   shadow-md rounded-lg max-w-4xl w-full p-6">
           
          <p className="text-sm sm:text-lg mb-4 text-center">
            Welcome to our Ed-Tech platform, <b>MASTER!</b> We are dedicated to providing the
            best educational resources and tools to help you achieve your
            learning goals.
          </p>
          <p className="text-sm sm:text-lg mb-4  text-center">
            Our platform offers a wide range of courses, interactive lessons,
            and personalized learning experiences. Our mission is to make
            education accessible and engaging for everyone.
          </p>
          <p className="text-sm sm:text-lg mb-4  text-center">
            Our team is composed of experienced educators, developers, and
            designers who are passionate about creating a user-friendly and
            effective learning environment.
          </p>
          <p className="text-sm sm:text-lg mb-4  text-center">
            Thank you for choosing our platform. We are excited to be part of
            your educational journey!
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default AboutUs;
