import PricingCard from "../../components/Homepage/PricingCard";
import HightlightText from "../../components/Homepage/HightlightText";




const Pricing = () => {
  return <div className="container relative mx-auto  mt-[6rem] px-2 mb-5 lg:px-4 lg:mt-[8rem] ">
        <div className="max-w-[1100px] w-full  mx-auto">
            <h1 className=" py-3 font-extrabold mb-[5rem] text-4xl lg:text-5xl 2xl:text-6xl text-center bg-gradient-to-br from-gray-400 to-white bg-clip-text text-transparent">Become the Master of High Demanding Technology </h1>
        </div>
        <div className="flex flex-col  lg:flex-row gap-5 justify-center items-center ">
            <PricingCard title={"Full Stack"} price={"4999"} className={"bg-gradient-to-br from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent"}  description={"Fronted+Backend full course with many project"} />
            <PricingCard title={"Cloud Computing"} price={"7599"} className={"bg-gradient-to-br from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent"}  description={"Fronted+Backend full course with many project"} />
            <PricingCard title={"Machine Learning"} price={"7899"}  className={"bg-gradient-to-br from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent"} description={"Fronted+Backend full course with many project"} />
        </div>
        
  </div>;
};
export default Pricing;
