
import Cards from "../../components/Homepage/Cards";
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
      delay:.2*index,
      duration:.9
    }
  })
}
const CodeBlocks = () => {
  const cardHeadings = ["Web Development", "Machine Learning", "MERN Stack", "Cloud Computing"];
  return (
    <div className=" relative mx-auto      ">
      <div className="tracking-[3px] max-w-[50rem] mx-auto  font-sans uppercase text-gray-400 select-none font-bold text-sm lg:text-lg mb-[5rem] lg:mb-[6rem] mt-[5rem]">
        <h2 className="text-center ">
          Unlock your coding potential with our online courses
        </h2>
      </div>
      <div className=" flex flex-wrap max-w-[1200px]  gap-10 justify-center mx-auto ">
      {
        cardHeadings.map((value,index)=>(
          <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{
            once:true
          }} custom={index}>

          <Cards key={index} head={value}/>
          </motion.div>
        ))
      }
        
       
      </div>
    </div>
  );
};

export default CodeBlocks;
