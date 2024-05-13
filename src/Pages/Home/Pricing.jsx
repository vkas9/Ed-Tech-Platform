import PricingCard from "../../components/Homepage/PricingCard";
import HightlightText from "../../components/Homepage/HightlightText";
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
const Pricing = () => {
  const Price=[
    {
      title:"Full Stack",
      price:"499",
      description:"Fronted+Backend full course with many project"
    },{
      title:"Cloud Computing",
      price:"999",
      description:"Learn AWS, GCP and Much more"
    },{
      title:"Machine Learning",
      price:"799",
      description:"Fastest Growing Tech Field"
    }
  ]
  return <div className=" relative mx-auto  mt-[6rem] px-2 mb-5 lg:px-4 lg:mt-[8rem] ">
        <div className="max-w-[1100px] w-full  mx-auto">
            <h1 className=" py-3 font-extrabold mb-[5rem] text-4xl lg:text-5xl 2xl:text-6xl text-center bg-gradient-to-br from-gray-400 to-white bg-clip-text text-transparent">Become the Master of High Demanding Technology </h1>
        </div>
        <div className="flex flex-col  lg:flex-row gap-5 justify-center items-center ">
            {
              
              Price.map((value,index)=>(
                <motion.div key={index} variants={fadeIn} initial="initial" whileInView="animate" viewport={{
                  once:true
                }} custom={index}>
                <PricingCard key={index} title={value.title} price={value.price} description={value.description}/></motion.div>
              ))
            }
        </div>
        
  </div>;
};
export default Pricing;
