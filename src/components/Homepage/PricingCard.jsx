import { GoCheckCircleFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

const PricingCard = ({detail}) => {
    const navigate=useNavigate()
    return (

        <div className="border-solid border p-4 border-gray-400/30 max-w-[25rem] rounded-2xl  ">
            <div className="flex flex-col gap-5 ">
                <h3 className={`text-4xl text-center font-bold  py-1 `}>{detail?.title}</h3>
                <p className=" text-md text-center text-gray-300 font-semibold ">{detail?.description}</p>
            </div>

            <div className=" mt-10 flex flex-col font-semibold bg-red px-1">
                
                <div className=" border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>{detail?.points[0]}</p>

                </div>

                
                <div className="  border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>{detail?.points[1]}</p>

                </div>
                
                <div className="  border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>{detail?.points[2]}</p>

                </div>
                
                <div className=" border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>{detail?.points[3]}</p>

                </div>
                
                <div className=" border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>{detail?.points[4]}</p>

                </div>
                
                <div className=" border-t-[1px] border-gray-300/30  min-h-[50px] py-4  flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>{detail?.points[5]}</p>

                </div>
            </div>
            <div className="mt-[4rem] ">
                <div className=" text-5xl lg:text-6xl font-bold "><span className="text-4xl">₹</span> {detail?.price}</div>
                <div onClick={(e)=>{
                    e.stopPropagation()
                    e.preventDefault()
                    navigate("/dashboard/courses/cloud-computing")
                }}  className="select-none w-full text-center text-black bg-white rounded-xl py-2 mt-8 text-3xl font-bold hover:cursor-pointer active:text-[#07214a]  hover:text-[#07214a] active:bg-gradient-to-br sm:hover:bg-gradient-to-br from-[#13498a]  to-[#34b7eb]  transition-all duration-200  ">
                    <Link to="/dashboard/courses/cloud-computing">Enroll Now</Link>
                </div>

            </div>
        </div>

    );
};
export default PricingCard;
