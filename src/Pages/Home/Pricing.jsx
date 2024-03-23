import PricingCard from "../../components/Homepage/PricingCard";
import HightlightText from "../../components/Homepage/HightlightText";




const Pricing = () => {
  return <div className="container relative mx-auto  mt-[6rem] px-2 mb-5 lg:px-4 lg:mt-[8rem] ">
        <div className="max-w-[1100px] w-full  mx-auto">
            <h1 className="font-extrabold mb-[5rem] text-4xl lg:text-5xl 2xl:text-6xl text-center">Become the Master of High Demanding <HightlightText className={"bg-gradient-to-br from-blue-500 to-red-500 bg-clip-text text-transparent "}>Technology</HightlightText> </h1>
        </div>
        <div className="flex flex-col  lg:flex-row gap-5 justify-center items-center ">
            <PricingCard title={"Full Stack"} price={"4999"}   description={"Fronted+Backend full course with many project"} />
            <PricingCard title={"Cloud Computing"} price={"7599"}   description={"Fronted+Backend full course with many project"} />
            <PricingCard title={"Machine Learning"} price={"7899"}   description={"Fronted+Backend full course with many project"} />
        </div>
        
  </div>;
};
export default Pricing;
