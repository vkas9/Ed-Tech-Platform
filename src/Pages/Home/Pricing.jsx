import PricingCard from "../../components/Homepage/PricingCard";
import HightlightText from "../../components/Homepage/HightlightText";
import { motion } from "framer-motion";
import {courseDetails} from "../../constants/courseDetails"
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
const Pricing = () => {
  
  return <div id="pricing-section" className=" relative mx-auto  mt-[6rem] px-2 mb-5 lg:px-4 lg:mt-[8rem] ">
        <div className="max-w-[1100px] w-full  mx-auto">
            <h1 className=" py-3 font-extrabold mb-[5rem] text-4xl lg:text-5xl 2xl:text-6xl text-center   text-white bg-clip-text text-transparent">Become the Master of High Demanding Technology </h1>
        </div>
        <div className="flex flex-col  lg:flex-row gap-5 justify-center items-center ">
            {
              
              courseDetails.map((value,index)=>(
                <motion.div key={index} variants={fadeIn} initial="initial" whileInView="animate" viewport={{
                  once:true
                }} custom={index}>
                <PricingCard key={index} detail={value}/></motion.div>
              ))
            }
        </div>
        
  </div>;
};
export default Pricing;
