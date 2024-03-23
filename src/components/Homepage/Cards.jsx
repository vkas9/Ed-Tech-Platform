import { TypeAnimation } from "react-type-animation";
import Button from "../../components/Homepage/Button";
import { IoCodeSlashSharp } from "react-icons/io5";
import gradient from "../../assets/gradient.jpg";
const Cards=({head})=>{
    return (
        <div className="relative bg-white/10 backdrop-blur-md overflow-visible border-solid border border-gray-400/10  outline-none max-h-[35rem] w-[28rem] gap-6 rounded-2xl px-4 mx-3 py-2  flex flex-col justify-between">
          <div className="flex  flex-col  gap-6 ">
            <h3 className="  overflow-hidden text-[1.7rem] md:text-[2.5rem] font-bold ">
              {head}
            </h3>
            <p className=" text-gray-400 text-md font-semibold ">
            Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
            </p>
          </div>
          <div className="flex mb-2    items-center justify-between ">
            <Button
              className={
                "outline-none py-2 text-center text-black font-bold text-[1.4rem] bg-yellow-500"
              }
            >
              Explore More
            </Button>
            <IoCodeSlashSharp className="   text-4xl" />
          </div>
{/*           <div className="h-[200px] w-[400px] rounded-full absolute -left-4 opacity-60 -top-4 -z-10 lg:blur-[70px] blur-[40px] "><img src={gradient} alt="" /></div> */}
        </div>
    );
}
export default Cards;
