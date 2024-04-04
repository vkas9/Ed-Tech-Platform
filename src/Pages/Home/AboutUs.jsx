import { Link } from "react-router-dom";
import video from "../../assets/particle.mp4";
import Button from "../../components/Homepage/Button";
import toast from "react-hot-toast";
const AboutUs = () => {
  const handleClick=()=>{
    console.log("hi");
    toast.success("success")
  }
  return (
    <div className=" overflow-hidden relative py-[5rem]  flex flex-col items-center mx-auto ">
      <div className=" relative  z-[3] py-4 gap-2 flex flex-col text-center h-full ">
        <span className=" text-md md:text-2xl">Get Started Today</span>
        <h1 className=" text-6xl px-1 md:text-6xl font-bold">
          Learn. Grow. Succeed.
        </h1>
        <Link to={"/signup"} onClick={handleClick} className=" mt-5">
          <Button className={"mx-auto bg-yellow-500 outline-none py-2"}>
            Explore More
          </Button>
        </Link>
      </div>
      <div className="absolute overflow-hidden  rounded-2xl h-full mx-auto  top-0">
        <video
          src={video}
          muted
          loop
          autoPlay
          className="  relative mx-auto min-w-[1200px] "
          type="mp4"
        ></video>
      </div>
    </div>
  );
};

export default AboutUs;
