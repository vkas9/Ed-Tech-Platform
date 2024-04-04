
import Cards from "../../components/Homepage/Cards";

const CodeBlocks = () => {
  return (
    <div className=" relative mx-auto      ">
      <div className="tracking-[3px] max-w-[50rem] mx-auto  font-sans uppercase text-gray-400 select-none font-bold text-sm lg:text-lg mb-[5rem] lg:mb-[6rem] mt-[5rem]">
        <h2 className="text-center ">
          Unlock your coding potential with our online courses
        </h2>
      </div>
      <div className=" flex flex-wrap max-w-[1200px]  gap-10 justify-center mx-auto ">
        <Cards head=" Web Development" description=" "/>
        <Cards head=" Backend Development"/>
        <Cards head=" MERN Stack"/>
        <Cards head=" System Design"/>
      </div>
    </div>
  );
};

export default CodeBlocks;
