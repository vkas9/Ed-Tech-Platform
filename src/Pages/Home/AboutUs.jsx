import { Link } from "react-router-dom";
import video from "../../assets/particle.mp4";
import Button from "../../components/Homepage/Button";
import toast from "react-hot-toast";
const AboutUs = () => {

  return (
    <div className=" overflow-hidden relative py-[5rem]  flex flex-col items-center mx-auto ">
      <div className=" relative  z-[3] py-4 gap-2 flex flex-col text-center h-full ">
        <span className=" text-md md:text-2xl  bg-gradient-to-br   md:bg-gradient-to-b from-white via-white to-black/40 bg-clip-text text-transparent">Get Started Today</span>
        <h1 className=" text-6xl px-1 md:text-6xl   bg-gradient-to-b from-white via-white to-black bg-clip-text text-transparent font-bold">
          Learn. Grow. Succeed.
        </h1>
        <div  className=" mt-5">
          <Button link={"/dashboard/courses"} className={"mx-auto rounded-md font-bold text-yellow-950 hover:bg-yellow-400 bg-yellow-500 outline-none py-2"}>
            Explore More
          </Button>
        </div>
      </div>
      <div className="absolute overflow-hidden  rounded-2xl h-full mx-auto  top-0">
        <video
          src={video}
          muted
          loop
          autoPlay
          className="  relative    mx-auto min-w-[1200px] "
          type="mp4"
        >
        </video>
          <div className="w-screen absolute  top-0  h-screen  bg-gradient-to-br from-[#020512]/80 to-transparent">

          </div>
      </div>
    </div>
  );
};

export default AboutUs;
