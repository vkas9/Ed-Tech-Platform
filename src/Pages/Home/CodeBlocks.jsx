
import Cards from "../../components/Homepage/Cards";

const CodeBlocks = () => {
  return (
    <div className="container relative mx-auto  min-h-[900px]   ">
      <div className="tracking-[3px] max-w-[50rem] mx-auto  font-sans uppercase text-gray-400 select-none font-bold text-sm lg:text-lg mb-[5rem] lg:mb-[8rem] mt-[3rem]">
        <h2 className="text-center ">
          Unlock your coding potential with our online courses
        </h2>
      </div>
      <div className=" flex flex-wrap max-w-[1200px]   gap-10 justify-center mx-auto ">
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
      </div>
    </div>
  );
};

export default CodeBlocks;
