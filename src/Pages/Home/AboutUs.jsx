import { Link } from "react-router-dom";
import video from "../../assets/particle.mp4";
import Button from "../../components/Homepage/Button";
const AboutUs = () => {
  return (
    <div className=" overflow-hidden relative py-[5rem]  max-w-[2200px]  mx-auto ">
      <div className=" relative  z-[3] py-4 gap-2 flex flex-col text-center h-full ">
        <span className=" text-md md:text-2xl">Get Started Today</span>
        <h1 className=" text-4xl md:text-6xl font-bold">
          Learn. Grow. Succeed.
        </h1>
        <Link to={"/signup"} className=" mt-5">
          <Button className={"mx-auto bg-yellow-500 outline-none py-2"}>
            Explore More
          </Button>
        </Link>
      </div>
      <div className="absolute  h-full mx-auto w-full  top-0">
        <video
          src={video}
          muted
          loop
          autoPlay
          className="  relative w-full min-w-[3200px]  "
          type="mp4"
        ></video>
        
      </div>
    </div>
  );
};

export default AboutUs;
