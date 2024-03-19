import { TypeAnimation } from "react-type-animation";
import Button from "../../components/Homepage/Button";
import { IoCodeSlashSharp } from "react-icons/io5";

const CodeBlocks = () => {
  return (
    <div className="container relative mx-auto  min-h-[900px] overflow-hidden  ">
      <div className="tracking-[3px] max-w-[50rem] mx-auto  font-sans uppercase text-gray-400 select-none font-bold text-sm lg:text-lg mb-[5rem] lg:mb-[8rem] mt-[3rem]">
        <h2 className="text-center ">
          Unlock your coding potential with our online courses
        </h2>
      </div>
      <div className=" flex flex-wrap   gap-10 justify-center mx-auto ">
        <div className="relative bg-white/10 backdrop-blur-md overflow-visible border-solid border border-gray-400/40  outline-none max-h-[35rem] w-[28rem] gap-6 rounded-2xl px-4 mx-3 py-2  flex flex-col justify-between">
          <div className="flex  flex-col  gap-6 ">
            <h3 className=" text-[1.5rem] md:text-[2.5rem] font-bold ">
              {" "}
              Fast Responding
            </h3>
            <p className=" text-gray-400 text-md font-semibold ">
              <TypeAnimation
                sequence={[
                  "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.",
                  100000000,
                  "",
                ]}
                repeat={0}
                cursor={true}
                omitDeletionAnimation={true}
                speed={50}
                wrapper="span"
              />
            </p>
          </div>
          <div className="flex mb-2  flex-col md:flex-row  items-center justify-between ">
            <Button
              className={
                "outline-none py-2 text-center text-black font-bold text-[1.4rem] bg-yellow-500"
              }
            >
              Expore More
            </Button>
            <IoCodeSlashSharp className="   text-4xl" />
          </div>
          <div className="h-[200px] w-[300px] bg-gradient-to-br from-blue-500 to-purple-700 rounded-full absolute -left-4 -z-10 blur-[120px] "></div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
