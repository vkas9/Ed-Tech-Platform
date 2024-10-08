import Button from "../../components/Homepage/Button";
import { IoCodeSlashSharp } from "react-icons/io5";
import gradient from "../../assets/gradient.webp";

const Cards=({head})=>{
    return (
        <div className="relative bg-white/[.07] backdrop-blur-md overflow-visible border-solid border border-white/10 min-h-[17rem] outline-none max-h-[40rem] max-w-[30rem] gap-6 rounded-2xl px-4 mx-3 py-2  flex flex-col justify-between">
          <div className="flex  flex-col  gap-6 ">
            <h3 className="  overflow-hidden text-[1.7rem] md:text-[2.5rem] font-bold ">
              {head.title}
            </h3>
            <p className=" text-gray-400 text-md font-semibold ">
           {head.description}
            </p>
          </div>
          <div className="flex mb-2    items-center justify-between ">
            <Button
            link={"/dashboard/courses/cloud-computing"}
              className={
                "outline-none rounded-md py-2 text-center text-[#0b2442] font-bold text-[1rem] lg:text-[1.4rem]  bg-gradient-to-br from-[#13498a]  to-[#34b7eb] active:bg-[#34b7eb] lg:hover:bg-[#34b7eb]"
              }
            >
              Explore More
            </Button>
            <IoCodeSlashSharp className="text-4xl text-white/50" />
          </div>
          <div className="h-[200px] flex w-[300px]  absolute -left-4 opacity-40 -top-4 -z-10 lg:blur-[70px] blur-[50px] "><img src={gradient} className="rotate-12 " alt="" /></div>
        </div>
    );
}
export default Cards;
