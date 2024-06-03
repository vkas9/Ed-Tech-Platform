import { GoCheckCircleFill } from "react-icons/go";
import { Link } from "react-router-dom";

const PricingCard = ({ title, price, description, className }) => {
    return (

        <div className="border-solid border p-4 border-gray-400/30 max-w-[25rem] rounded-2xl  ">
            <div className="flex flex-col gap-5 ">
                <h3 className={`text-4xl text-center font-bold  py-1 ${className}`}>{title}</h3>
                <p className=" text-md text-center text-gray-300 font-semibold ">{description}</p>
            </div>

            <div className=" mt-10 flex flex-col font-semibold bg-red px-1">
                
                <div className=" border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>You will Learn Indepth Knowledge on fronted-Backend Technologies</p>

                </div>

                
                <div className="  border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>10+ Mega Projects</p>

                </div>
                
                <div className="  border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>Lifetime access</p>

                </div>
                
                <div className=" border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>30-day money-back guarantee</p>

                </div>
                
                <div className=" border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>Completion Certificate</p>

                </div>
                
                <div className=" border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>Access to GitHub Reposit</p>

                </div>
            </div>
            <div className="mt-[4rem] ">
                <div className=" text-5xl lg:text-6xl font-bold "><span className="text-4xl">₹</span> {price}</div>
                <div  className="select-none w-full text-center text-black bg-white rounded-xl py-2 mt-8 text-3xl font-bold hover:cursor-pointer active:text-yellow-950 active:bg-yellow-500 md:hover:text-yellow-950 md:hover:bg-yellow-500  transition-all duration-200  ">
                    <Link to="/dashboard/courses">Enroll Now</Link>
                </div>

            </div>
        </div>

    );
};
export default PricingCard;
